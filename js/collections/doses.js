/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Doses Collection
  // ---------------

  var Doses = Backbone.Collection.extend({

    //model: app.Dose,  

    url: '../data/doses.json',

    total: function() {
      return this.length;
    },    

    getData : function() {
      return this.toJSON();
    }

  });

  // Create our global collection of **Doses**.
  app.doses = new Doses();

})();
