var app = app || {};

(function ($) {
  'use strict';

  app.ResetTimeView = Backbone.View.extend({

    el: '#time-subview #reset',

    initialize: function (options) {
      this.parent = options.parent;
      this.listenTo(this.parent.model, 'change:reset',  this.render)
      this.render();
    },

    render: function () {
      var state = this.parent.model.get('reset');
      (state) ? this.on() : this.off();
    },

    on: function () {
      this.$el.prop('disabled', false);
    },
 
    off: function () {
      this.$el.prop('disabled', true);
    }
  });
})(jQuery);