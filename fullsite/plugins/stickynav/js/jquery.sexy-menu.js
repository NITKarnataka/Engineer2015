/*! sexymenu.js, 0.1.0: 14-04-2014 */

(function($, window, undefined) {
  var pluginName = 'sexymenu',
      defaults = {
        classes: {
          visible: 'visible',
          detached: 'detached'
        },

        topOffset: 250,
        bottomOffset: 150,
        hideShowOffset: 10,

        delay: 30
      };

  function Plugin(element, options) {
    this._name = pluginName;
    this.element = $(element);
    this.options = options;
    this.settings = $.extend({}, defaults, options);

    this.init();
  };

  Plugin.prototype = {
    init: function() {
      var self = this;

      this._window = $(window);
      this.settings.previousScroll = this._window.scrollTop();

      this.element.addClass('sexy-menu');
      $('body').addClass('being-sexy');

      this._window.on('scroll', function() {
        if (self.isScrollDelayed) {
          clearTimeout(self.isScrollDelayed);
        }

        self.isScrollDelayed = setTimeout(function() {
          self.updatePosition();
        }, self.settings.delay);
      });

      this._window.trigger('scroll');
    },

    updatePosition: function() {
      var currentScroll = this._window.scrollTop(),
          scrollDifference = Math.abs(currentScroll - this.settings.previousScroll),
          menuOffset = this.element.outerHeight();

      // If scrolled past menu
      if (currentScroll > menuOffset) {
        // If scrolled past detach point add class to fix menu
        if (currentScroll > this.settings.topOffset) {
          this.element.addClass(this.settings.classes.detached);
        }

        // If scrolling faster than hideShowOffset hide/show menu
        if (scrollDifference >= this.settings.hideShowOffset) {
          if (currentScroll > this.settings.previousScroll) {
            // Scrolling down, hide menu
            this.element.removeClass(this.settings.classes.visible);
          } else {
            this.element.addClass(this.settings.classes.visible);
          }
        }
      } else {
        // Only remove detached class if user is at top of document
        if (currentScroll <= 0) {
          this.element.removeClass(this.settings.classes.detached);
        }
      }

      // If user is near the bottom of document then show menu
      if (this._window.scrollTop() + this._window.height() >= $(document).height() - this.settings.bottomOffset) {
        this.element.addClass(this.settings.classes.visible);
      }

      this.settings.previousScroll = currentScroll;
    }
  };

  // Expose plugin on $/jQuery
  if ($ && $.fn) {
    $.fn[pluginName] = function(options) {
      this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });

      return this;
    }
  }
})(window.jQuery, window);
