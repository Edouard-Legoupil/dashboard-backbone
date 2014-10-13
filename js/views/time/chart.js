var app = app || {};

(function ($) {
  'use strict';

  app.ChartTimeView = Backbone.View.extend({

    el: '#time-subview #chart',

    initialize: function (options) {
      this.parent = options.parent;
      this.listenTo(this.parent.model, 'change:brushExtent',  this.render);

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
                .tickValues([1,10,100,1000]))
        .hasBrush(true);

        var that = this;
        this.chart.on('brush', function(e) { 
          that.parent.model.set('brushExtent', that.chart.brush().extent());
        });  
        this.chart.on('brushend', function(e) { 
          if (that.chart.brush().empty()) {
            that.parent.model.set('brushExtent', null);
          }          
        });  

        this.render();
    },

    render: function () {    
      d3.select('#time-subview #chart').call(this.chart);
    },

   
  });
})(jQuery);