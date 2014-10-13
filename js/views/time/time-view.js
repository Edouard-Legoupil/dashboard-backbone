var app = app || {};

(function ($) {
  'use strict';

 
  app.TimeView = Backbone.View.extend({

    el: '#time-subview',

    presets: {
      'preset1': [new Date(2011, 5, 1), new Date(2012, 1, 1)],
      'preset2': [new Date(2011, 5, 1), new Date(2012, 1, 1)],
      'preset3': [new Date(2011, 5, 1), new Date(2012, 1, 1)]
    },

    events: {
      'click #reset':  'cleared',
      'click #presets': 'preset'
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
      this.model.set({'reset': false, 'preset': false, 'brushExtent': null});
    },

    preset: function () {
      this.model.set({'reset': true, 'preset': true});
    }

  });




})(jQuery);