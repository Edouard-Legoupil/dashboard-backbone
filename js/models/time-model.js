/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.TimeModel = Backbone.Model.extend({
    defaults: {
      reset: false,
      preset: false,
      brushExtent: null
    },

    initialize: function () {
      this.on('change:brushExtent', this.synchronize); 
    },

    synchronize: function () {
      // Filter crossfilter associated dimension
      app.dataList.timeDim.filter(this.get('brushExtent'));
      // Dispatch event to event aggregator
      Backbone.trigger('chart:sync');
    }

  });
})();