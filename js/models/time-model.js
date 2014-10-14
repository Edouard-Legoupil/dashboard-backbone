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
      this.on('change:brushEmpty', function(){ 
        //console.log(this.get('brushEmpty')) 
      })
    },

    synchronize: function () {
      // Filter crossfilter associated dimension
      //console.log(this.get('brushExtent'));
      (this.get('brushEmpty')) ?
        app.dataList.timeDim.filter(null):
        app.dataList.timeDim.filter(this.get('brushExtent'));

      //console.log(app.dataList.timeDim.top(Infinity).length);

      // Dispatch event to event aggregator
      Backbone.trigger('chart:sync');
    }

  });
})();