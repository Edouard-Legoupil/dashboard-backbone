/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Data Collection
  // ---------------

  var DataList = Backbone.Collection.extend({

    //model: app.Dose,  

    url: '../data/doses.json',

    initialize: function () {
      //app.data.fetch({reset: true});
      this.data = null;
      this.on('reset', this._prepare);
    },

    _prepare: function () {
      this.data = this.toJSON();
      this._coerce();
      this._crossfilterSetup();
      this.trigger('dataReady'); // can start now rendering
    },

    _coerce: function (d) {
      this.dateFormat = d3.time.format('%d/%m/%Y');
      var that = this;
      this.data.forEach(function(d, i) {
          d.index = i;
          d.date = that.dateFormat.parse(d.date);
          d.dose_rate = +d.dose_rate;
          d.lat = +d.lat;
          d.lon = +d.lon;
      });
    },

    _crossfilterSetup: function () {
      var cf = crossfilter(this.data);

      this.dimTime = cf.dimension(function(d) {
        return d3.time.week(d.date);});
      this.grpTime = this.dimTime.group().reduceCount();
      this.histTime = cf.dimension(function(d) {return d.dose_rate;});
      this.grpTime = this.histTime.group(function(d) { return Math.floor(d);});
    }

  });

  app.dataList = new DataList();

})();
