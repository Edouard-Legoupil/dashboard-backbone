var app = app || {};

(function ($) {
  'use strict';

 
  app.TimeView = Backbone.View.extend({

    el: '#time-subview',

    events: {
      "click #reset":  "cleared",
      "click #preset": "preset"
     },

    initialize: function (options) {
      this.parent = options.parent;
      var resetTimeView = new app.ResetTimeView({parent: this});
      var presetsTimeView = new app.PresetsTimeView({parent: this});
      var chartTimeView = new app.ChartTimeView({parent: this});
    },

    render: function () {
    },

    cleared: function () {
      this.model.set({"reset": false, "preset": false});
    },

    preset: function () {
      this.model.set({"reset": true, "preset": true});
    }

  });




})(jQuery);