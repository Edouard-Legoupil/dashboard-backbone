/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
  'use strict';


  app.AppView = Backbone.View.extend({

    el: '#dashboard',

    initialize: function () {
      //this.timeView = new app.TimeView();
      //this.timeView.parent = this;

      this.listenTo(app.doses, 'reset', this.render);
      app.doses.fetch({reset: true});
    },

    render: function () {
      var timeView = new app.TimeView({parent: this, model: new app.TimeModel});


      //var histoView = new app.HistoView();
      //var mapView = new app.MapView();
      //var tableView = new app.TableView();

      //return this; 
    }

  });
})(jQuery);