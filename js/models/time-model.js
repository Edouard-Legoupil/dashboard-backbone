/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.TimeModel = Backbone.Model.extend({
    defaults: {
      reset: false,
      preset: false,
      brushEmpty: true,
      brushExtent: null
    },

    initialize: function () {
      this.on('change:brushExtent', this.synchronize); 
    },

    synchronize: function () {
      // Dispatch event to event aggregator
      Backbone.trigger('chart:sync');
  
      // Filter crossfilter associated dimension
      (this.get('brushEmpty')) ?
        app.dataList.timeDim.filter(null):
        app.dataList.timeDim.filter(this.get('brushExtent'));
    }
  });
})();