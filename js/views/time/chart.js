var app = app || {};

(function ($) {
  'use strict';

  app.ChartTimeView = Backbone.View.extend({

    el: '#time-subview #chart',

    initialize: function (options) {
      this.parent = options.parent;

      this.chart = rdn.timeSeries.bars()
        .id(1)
        .margin({top: 15, right: 30, bottom: 30, left: 30})
        //.dimension(app.dataList.timeDim)
        .prettyDate(app.dataList.dateFormat)
        .group(app.dataList.timeGrp)
        .x(d3.time.scale()
            .domain(d3.extent(app.dataList.data, function(d) { 
              return d.date; }))
            .range([0, 380])
            .nice())
        .y(d3.scale.log()
            .clamp(true)
            .domain([d3.max(app.dataList.timeGrp.all(), 
              function(d) { return d.value;}), 0.1])
            .range([0, 50]))
        .xAxis(d3.svg.axis()
                .orient("bottom")
                .ticks(10))
        .yAxis(d3.svg.axis()
                .orient("left")
                .ticks(4, ",.1s")
                .tickValues([1,10,100,1000]));

        Backbone.on('chart:sync', this.sync, this);
        this.render();
    },

    render: function () {    
      d3.select('#time-subview #chart').call(this.chart);
    },

    sync: function() {
      this.chart.brushExtent(this.parent.model.get('brushExtent'));
      this.render();
    }
   
  });
})(jQuery);