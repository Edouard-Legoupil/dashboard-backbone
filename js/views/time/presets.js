var app = app || {};

(function ($) {
  'use strict';

  // The Application
  // ---------------

  app.PresetsTimeView = Backbone.View.extend({

    el: '#time-subview #preset1',

    initialize: function (options) {
      this.parent = options.parent;
      //this.listenTo(this.parent.model, 'change:preset',  this.render)
      //this.render();
    },

    render: function () {
    }

  });
})(jQuery);