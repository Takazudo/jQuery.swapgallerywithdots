# encapsulate plugin
do ($=jQuery) ->

  ns = {}

  # ============================================================
  # Main

  class ns.Main

    @defaults =
      selector_gallery_container: null
      selector_gallery_inner: null
      selector_gallery_item: null
      selector_dot_container: null
      selector_dot_item: null
      class_dot_activeItem: null
      class_dot_inactiveItem: null
      src_dotItem: null
    
    constructor: (@$el, options) ->
      
      @options = $.extend {}, ns.Main.defaults, options
      @_prepareTouchdragh()
      @_putDotsHtml()
      @_prepareDots()
      @_eventify()
    
    countItems: ->

      return (@$gallery.find @options.selector_gallery_item).length

    _prepareTouchdragh: ->

      o = @options
      @$gallery = @$el.find o.selector_gallery_container

      $items = @$gallery.find o.selector_gallery_item

      galleryOptions =
        inner: o.selector_gallery_inner
        item: o.selector_gallery_item
        stepwidth: $items.eq(0).outerWidth()
        maxindex: $items.length

      @$gallery.touchdraghsteppy galleryOptions
      @touchdragh = @$gallery.data 'touchdraghsteppy'

      return this

    _putDotsHtml: ->

      @$dots = @$el.find @options.selector_dot_container
      
      src = @options.src_dotItem
      l = @countItems()
      srcs = ''

      for [0...l]
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
        @dot.to data.index
      
      return this

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

