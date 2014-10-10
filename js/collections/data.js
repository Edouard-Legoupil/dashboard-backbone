/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Doses Collection
  // ---------------

  var DataList = Backbone.Collection.extend({

    //model: app.Dose,  

    url: '../data/doses.json',

    initialize: function () {
      //app.data.fetch({reset: true});
      this.data = null;
      this.on('reset', this.prepare);
    },

    prepare: function () {
      var dateFormat = d3.time.format('%d/%m/%Y');
      this.data = this.toJSON();

      // A bit of coerce
      this.data.forEach(function(d, i) {
          d.index = i;
          d.date = dateFormat.parse(d.date);
          d.dose_rate = +d.dose_rate;
          d.lat = +d.lat;
          d.lon = +d.lon;
      });

      this.trigger('dataReady'); // can start now rendering
    },

    total: function() {
      return this.length;
    },    

    getData : function() {
      return this.toJSON();
    }

  });

  // Create our global collection of **Doses**.
  app.dataList = new DataList();

})();
