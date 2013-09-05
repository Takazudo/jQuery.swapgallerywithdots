/*! jQuery.swapgallerywithdots (https://github.com/Takazudo/jQuery.swapgallerywithdots)
 * lastupdate: 2013-09-05
 * version: 0.1.5
 * author: 'Takazudo' Takeshi Takatsudo <takazudo@gmail.com>
 * License: MIT */
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($) {
    var ns;
    ns = {};
    ns.Main = (function(_super) {

      __extends(Main, _super);

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
        maxindex: 'auto',
        normalize_height: true,
        normalize_height_on_resize: true
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
          inner2left: o.inner2left || 0,
          normalize_height: o.normalize_height,
          normalize_height_on_resize: o.normalize_height_on_resize
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
          var i;
          if (_this.options.forever) {
            i = data.normalizedIndex;
          } else {
            i = data.index;
          }
          _this.dot.to(i);
          return _this.trigger('indexchange', {
            index: i
          });
        });
        return this;
      };

      return Main;

    })(window.EveEve);
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
