/*! jQuery.swapgallerywithdots (https://github.com/Takazudo/jQuery.swapgallerywithdots)
 * lastupdate: 2013-06-13
 * version: 0.1.1
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
        selector_gallery_item: null,
        selector_dot_container: null,
        selector_dot_item: null,
        class_dot_activeItem: null,
        class_dot_inactiveItem: null,
        src_dotItem: null
      };

      function Main($el, options) {
        this.$el = $el;
        this.options = $.extend({}, ns.Main.defaults, options);
        this._prepareTouchdragh();
        this._putDotsHtml();
        this._prepareDots();
        this._eventify();
      }

      Main.prototype.countItems = function() {
        return (this.$gallery.find(this.options.selector_gallery_item)).length;
      };

      Main.prototype._prepareTouchdragh = function() {
        var $items, galleryOptions, o;
        o = this.options;
        this.$gallery = this.$el.find(o.selector_gallery_container);
        $items = this.$gallery.find(o.selector_gallery_item);
        galleryOptions = {
          inner: o.selector_gallery_inner,
          item: o.selector_gallery_item,
          stepwidth: $items.eq(0).outerWidth(),
          maxindex: $items.length
        };
        this.$gallery.touchdraghsteppy(galleryOptions);
        this.touchdragh = this.$gallery.data('touchdraghsteppy');
        return this;
      };

      Main.prototype._putDotsHtml = function() {
        var l, src, srcs, _i;
        this.$dots = this.$el.find(this.options.selector_dot_container);
        src = this.options.src_dotItem;
        l = this.countItems();
        srcs = '';
        for (_i = 0; 0 <= l ? _i < l : _i > l; 0 <= l ? _i++ : _i--) {
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
          return _this.dot.to(data.index);
        });
        return this;
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
