var app = app || {};

(function ($) {
  'use strict';

  app.ChartTimeView = Backbone.View.extend({

    el: '#time-subview #chart',

    initialize: function (options) {

      /*this.chart: rdn.timeSeries.bars()
        .id(1)
        .margin({top: 15, right: 30, bottom: 30, left: 30})
        .dimension(date)
        .prettyDate(dateFormat)
        .group(dates)
        .x(d3.time.scale()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([0, 380])
            .nice())
        .y(d3.scale.log()
            .clamp(true)
            .domain([d3.max(dates.all(), function(d) { return d.value;}), 0.1])
            .range([0, 50]))
        .xAxis(d3.svg.axis()
                .orient("bottom")
                .ticks(10))
        .yAxis(d3.svg.axis()
                .orient("left")
                .ticks(4, ",.1s")
                .tickValues([1,10,100,1000]))
        .hasBrush(true)
        .filter([new Date(2011, 5, 1), new Date(2012, 1, 1)]),*/

      this.parent = options.parent;
      this.listenTo(this.parent.model, 'change:brushExtent',  this.render)
      this.render();
    },

    render: function () {
    
    },

   
  });
})(jQuery);