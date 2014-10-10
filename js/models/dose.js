/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Dose Model
  // ----------

  app.Dose = Backbone.Model.extend({
    defaults: {
      date: null,
      time: null,
      city: null,
      lat: null,
      lon: null,
      dose_rate: null,
      prefecture: null,
      dataset: null,
      stationary: null
    }

  });
})();

