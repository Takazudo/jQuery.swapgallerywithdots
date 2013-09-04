# encapsulate plugin
do ($=jQuery) ->

  ns = {}

  # ============================================================
  # Main

  class ns.Main

    @defaults =
      selector_gallery_container: null
      selector_gallery_inner: null
      selector_gallery_inner2: null
      selector_gallery_item: null
      selector_dot_container: null
      selector_dot_item: null
      class_dot_activeItem: null
      class_dot_inactiveItem: null
      src_dotItem: null

      stepwidth: null
      widthbetween: 0
      forever: false
      forever_duplicate_count: 1
      maxindex: 'auto'
      normalize_height: true
      normalize_height_on_resize: true
    
    constructor: (@$el, options) ->
      
      @options = $.extend {}, ns.Main.defaults, options
      @$gallery = @$el.find @options.selector_gallery_container
      @_countItems()
      @_putDotsHtml()
      @_prepareTouchdragh()
      @_prepareDots()
      @_eventify()
    
    _countItems: ->

      selector = @options.selector_gallery_item
      @_itemsCount = (@$gallery.find selector).length
      return this

    _prepareTouchdragh: ->

      o = @options

      $items = @$gallery.find o.selector_gallery_item

      galleryOptions =
        inner: o.selector_gallery_inner
        inner2: o.selector_gallery_inner2
        item: o.selector_gallery_item
        stepwidth: o.stepwidth or $items.eq(0).outerWidth()
        widthbetween: o.widthbetween or 0
        maxindex: o.maxindex
        forever: o.forever
        forever_duplicate_count: o.forever_duplicate_count
        inner2left: o.inner2left or 0
        normalize_height: o.normalize_height
        normalize_height_on_resize: o.normalize_height_on_resize

      @$gallery.touchdraghsteppy galleryOptions
      @touchdragh = @$gallery.data 'touchdraghsteppy'

      return this

    _putDotsHtml: ->

      @$dots = @$el.find @options.selector_dot_container
      
      src = @options.src_dotItem
      srcs = ''

      for [0...@_itemsCount]
        srcs += src

      @$dots.append srcs

      return this
      
    _prepareDots: ->

      o = @options

      dotOptions =
        selector_item: o.selector_dot_item
        class_activeItem: o.class_dot_activeItem

      if o.class_dot_inactiveItem
        dotOptions.class_inactiveItem = o.class_dot_inactiveItem

      @$dots.currentDots dotOptions
      @dot = @$dots.data 'currentDots'

      return this

    _eventify: ->

      @dot.on 'itemclick', (data) =>
        @touchdragh.to data.index, true

      @touchdragh.on 'indexchange', (data) =>
        index = @_normalizeIndexForDot data.index
        @dot.to index
      
      return this

    _normalizeIndexForDot: (index) ->
      o = @options
      offset = @_itemsCount * o.forever_duplicate_count
      index = index - offset
      res = index % @_itemsCount
      if index < 0
        res = @_itemsCount - (Math.abs res)
        if res is @_itemsCount
          res = 0
      res

  # ============================================================
  # bridge to plugin

  $.fn.swapgallerywithdots = (options) ->
    return @each (i, el) ->
      $el = $(el)
      instance = new ns.Main $el, options
      $el.data 'swapgallerywithdots', instance
      return

  # ============================================================
  # globalify

  $.SwapgallerywithdotsNs = ns
  $.Swapgallerywithdots = ns.Main

