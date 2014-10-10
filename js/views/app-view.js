/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
  'use strict';


  app.AppView = Backbone.View.extend({

    el: '#dashboard',

    initialize: function () {
      //this.timeView = new app.TimeView();
      //this.timeView.parent = this;

      app.dataList.fetch({reset: true});
      this.listenTo(app.dataList, 'dataReady', this.render);
    },

    render: function () {
      console.log(app.dataList.data);

      var timeView = new app.TimeView({parent: this, model: new app.TimeModel});


      //var histoView = new app.HistoView();
      //var mapView = new app.MapView();
      //var tableView = new app.TableView();

      //return this; 
    }

  });
})(jQuery);