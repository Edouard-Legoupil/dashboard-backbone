!function () {
    var rdn = {version: '0.1.0'}; // semver
    
rdn.barchart = function() {};
rdn.histogram = function() {};

// Geospatial-related visualizations
rdn.geo = {};
rdn.geo.hexbin = function() {};
// Time series
rdn.timeSeries = {};
// Time series with filled bars

// TODO:
//  accessors for key, value attributes of groups

rdn.timeSeries.bars = function() {

  var id = 0,
      margin = {top: 10, right: 25, bottom: 30, left: 20},
      x = null,
      y = null,
      brush = d3.svg.brush(),
      group = null,
      prettyDate = d3.time.format("%d/%m/%Y %H:%M"),
      xAxis = d3.svg.axis().orient("bottom"), 
      yAxis = d3.svg.axis().orient("left"),
      hasBrush = false;

  var _width,
      _height,
      _brushExtentSet = false;

  function chart(div) {

    div.each(function() {
      var div = d3.select(this),
          g = div.select("g");

      // Create the skeleton chart.
      if (g.empty()) init();

      // If brush set programmatically
      if (_brushExtentSet) {
        brush.extent(brush.extent());
        brush.event(d3.select("g.brush"));  // Trigger brush.on event
      } 

      // Draw bars svg path
      g.selectAll(".bar").attr("d", barPath);

      function init(){
        _width = x.range()[1];
        _height = y.range()[1];
        brush.x(x);
        xAxis.scale(x);
        yAxis.scale(y);

        g = div.append("svg")
            .attr("width", _width + margin.left + margin.right)
            .attr("height", _height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.append("clipPath")
            .attr("id", "clip-" + id)
          .append("rect")
            .attr("width", _width)
            .attr("height", _height);

        g.selectAll(".bar")
            .data(["background", "foreground"])
          .enter().append("path")
            .attr("class", function(d) { return d + " bar"; })
            .datum(group.all());

        g.selectAll(".foreground.bar")
            .attr("clip-path", "url(#clip-" + id + ")");

        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + _height + ")")
            .call(xAxis);

        var gy = g.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

        var gBrush = g.append("g").attr("class", "brush").call(brush);
        gBrush.selectAll("rect").attr("height", _height);     
      }

    });

    function barPath(groups) {
      var path = [],
          i = -1,
          n = groups.length,
          d;
      while (++i < n) {
        d = groups[i];
        path.push("M", x(d.key)-5, ",", _height, "V", y(d.value), "h5V", _height);
      }
      return path.join("");
    }
  }

  brush.on("brushstart.chart", function() {
      //d3.select("#time-series-preset").selectAll('dd').classed('active', false);
  });

  brush.on("brush.chart", function() {
    var g = d3.select(this.parentNode),
        extent = brush.extent();

    g.select("#clip-" + id + " rect")
        .attr("x", x(extent[0]))
        .attr("width", x(extent[1]) - x(extent[0]));

    _brushExtentSet = false;
  });

  brush.on("brushend.chart", function() {
    if (brush.empty()) {
      var div = d3.select(this.parentNode.parentNode.parentNode);
      div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
    }
  });

  // Getters and Setters
  chart.id = function(_) {
    if (!arguments.length) return id;
    id = _;
    return chart;
  };
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };
  chart.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };
  chart.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };
  chart.xAxis = function(_) {
    if (!arguments.length) return xAxis;
    xAxis = _;
    return chart;
  };
  chart.yAxis = function(_) {
    if (!arguments.length) return yAxis;
    yAxis = _;
    return chart;
  };
  chart.group = function(_) {
    if (!arguments.length) return group;
    group = _;
    return chart;
  };
  chart.prettyDate = function(_) {
    if (!arguments.length) return prettyDate;
    prettyDate = _;
    return chart;
  };
  chart.brushExtent = function(_) {
    if (!arguments.length) return brush.extent();
    brush.extent(_);
    _brushExtentSet = true;
    return chart;
  };
  chart.brushIsEmpty = function(_) {
    if (!arguments.length) return brush.empty();
    return chart;
  };

  /*chart.brush = function(_) {
    if (!arguments.length) return brush;
    brush = _;
    return chart;
  };*/
  /*chart.filter = function(_) {
    if (!arguments.length) return filter;
    filter = _;
    _filterSet = true;
    return chart;
  };*/
  /*chart.hasBrush = function(_) {
    if (!arguments.length) return hasBrush;
    hasBrush = _;
    return chart;
  };*/
  
  return d3.rebind(chart, brush, "on");
};

rdn.timeSeries.boxplots = function() {};
rdn.timeSeries.line = function() {};
rdn.timeSeries.steps = function() {};
// Expose the package components
if (typeof module === 'object' && module.exports) {
    // The package is loaded as a node module
    this.d3 = require('d3');
    module.exports = rdn;
} else {
    // The file is loaded in the browser.
    window.rdn = rdn;
}
}();