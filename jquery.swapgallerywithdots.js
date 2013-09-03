/*! jQuery.swapgallerywithdots (https://github.com/Takazudo/jQuery.swapgallerywithdots)
 * lastupdate: 2013-09-03
 * version: 0.1.2
 * author: 'Takazudo' Takeshi Takatsudo <takazudo@gmail.com>
 * License: MIT */
(function() {

  (function($) {
    var ns;
    ns = {};
    ns.Main = (function() {

      Main.defaults = {
        selector_gallery_container: null,
        selector_gallery_inner: null,
        selector_gallery_inner2: null,
        selector_gallery_item: null,
        selector_dot_container: null,
        selector_dot_item: null,
        class_dot_activeItem: null,
        class_dot_inactiveItem: null,
        src_dotItem: null,
        stepwidth: null,
        widthbetween: 0,
        forever: false,
        forever_duplicate_count: 1,
        maxindex: 'auto'
      };

      function Main($el, options) {
        this.$el = $el;
        this.options = $.extend({}, ns.Main.defaults, options);
        this.$gallery = this.$el.find(this.options.selector_gallery_container);
        this._countItems();
        this._putDotsHtml();
        this._prepareTouchdragh();
        this._prepareDots();
        this._eventify();
      }

      Main.prototype._countItems = function() {
        var selector;
        selector = this.options.selector_gallery_item;
        this._itemsCount = (this.$gallery.find(selector)).length;
        return this;
      };

      Main.prototype._prepareTouchdragh = function() {
        var $items, galleryOptions, o;
        o = this.options;
        $items = this.$gallery.find(o.selector_gallery_item);
        galleryOptions = {
          inner: o.selector_gallery_inner,
          inner2: o.selector_gallery_inner2,
          item: o.selector_gallery_item,
          stepwidth: o.stepwidth || $items.eq(0).outerWidth(),
          widthbetween: o.widthbetween || 0,
          maxindex: o.maxindex,
          forever: o.forever,
          forever_duplicate_count: o.forever_duplicate_count,
          inner2left: o.inner2left || 0
        };
        this.$gallery.touchdraghsteppy(galleryOptions);
        this.touchdragh = this.$gallery.data('touchdraghsteppy');
        return this;
      };

      Main.prototype._putDotsHtml = function() {
        var src, srcs, _i, _ref;
        this.$dots = this.$el.find(this.options.selector_dot_container);
        src = this.options.src_dotItem;
        srcs = '';
        for (_i = 0, _ref = this._itemsCount; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--) {
          srcs += src;
        }
        this.$dots.append(srcs);
        return this;
      };

      Main.prototype._prepareDots = function() {
        var dotOptions, o;
        o = this.options;
        dotOptions = {
          selector_item: o.selector_dot_item,
          class_activeItem: o.class_dot_activeItem
        };
        if (o.class_dot_inactiveItem) {
          dotOptions.class_inactiveItem = o.class_dot_inactiveItem;
        }
        this.$dots.currentDots(dotOptions);
        this.dot = this.$dots.data('currentDots');
        return this;
      };

      Main.prototype._eventify = function() {
        var _this = this;
        this.dot.on('itemclick', function(data) {
          return _this.touchdragh.to(data.index, true);
        });
        this.touchdragh.on('indexchange', function(data) {
          var index;
          index = _this._normalizeIndexForDot(data.index);
          return _this.dot.to(index);
        });
        return this;
      };

      Main.prototype._normalizeIndexForDot = function(index) {
        var o, offset, res;
        o = this.options;
        offset = this._itemsCount * o.forever_duplicate_count;
        index = index - offset;
        res = index % this._itemsCount;
        if (index < 0) {
          res = this._itemsCount - (Math.abs(res));
          if (res === this._itemsCount) {
            res = 0;
          }
        }
        return res;
      };

      return Main;

    })();
    $.fn.swapgallerywithdots = function(options) {
      return this.each(function(i, el) {
        var $el, instance;
        $el = $(el);
        instance = new ns.Main($el, options);
        $el.data('swapgallerywithdots', instance);
      });
    };
    $.SwapgallerywithdotsNs = ns;
    return $.Swapgallerywithdots = ns.Main;
  })(jQuery);

}).call(this);
