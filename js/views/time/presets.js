var app = app || {};

(function ($) {
  'use strict';

  // In charge of UI rendering only
  app.PresetsTimeView = Backbone.View.extend({

    el: '#time-subview #preset1',

    initialize: function (options) {
      this.parent = options.parent;
    },

    render: function () {
    }

  });
})(jQuery);