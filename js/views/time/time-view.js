var app = app || {};

(function ($) {
  'use strict';

  // Implement the logic of the time dimension
  // Set time-model.js attributes
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

      var that = this;
      chartTimeView.chart.on('brush', function(e) { 
          //console.log('brush event');
          that.model.set({
            'brushEmpty': chartTimeView.chart.brushIsEmpty(),
            'brushExtent': chartTimeView.chart.brushExtent(),
            'reset': true
          });
      });  
      chartTimeView.chart.on('brushend', function(e) { 
        //console.log('brushend');
        if (chartTimeView.chart.brushIsEmpty()) {
          that.model.set({
            'brushEmpty': chartTimeView.chart.brushIsEmpty(),
            'brushExtent': chartTimeView.chart.brushExtent(),
            'reset': false
          });
        }          
      });  
    },

    render: function () {
    },

    cleared: function () {
      this.model.set({
        'reset': false,
        'preset': false,
        'brushEmpty': true,
        'brushExtent': [new Date(1970, 0, 1), new Date(1970, 0, 1)] });
    },

    preset: function () {
      this.model.set({'reset': true, 'preset': true});
    }

  });




})(jQuery);