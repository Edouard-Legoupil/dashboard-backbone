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
      var timeView = new app.TimeView({
        parent: this, 
        model: this.model.timeModel}
      );

      /*var histView = new app.HistView({
        parent: this,
        model: new app.TimeModel}
      );
      var mapView = new app.MapView({
        parent: this, 
        model: new app.TimeModel}
      );
      var tableView = new app.tableView({
        parent: this,
        model: new app.TimeModel}
      );*/

      Backbone.history.start();
    }

  });
})(jQuery);