d3.svg.barchart = function() {

  var margin = {top: 10, right: 10, bottom: 20, left: 0},
      width = 790,
      height = 450,
      padding = 0.25,
      duration = 250,
      tickFormat = null,
      xValue = function(d){ return d[0]; },
      yValue = function(d){ return d[1]; },
      xDomain,
      yDomain;

  function barchart(selection) {

    selection.each(function(datum, index) {

      var data = datum.map(function(d, i) {
        return [xValue.call(datum, d, i), yValue.call(datum, d, i)];
      });

      var xScale = d3.scale.ordinal()
          .domain(xDomain ? xDomain.call(this) : data.map(function(d){ return d[0]; }))
          .rangeBands([0, width - margin.left - margin.right], padding);

      var yScale = d3.scale.linear()
          .domain(yDomain ? yDomain.call(this) : [0, d3.max(data, function(d){ return 1.1*(d[1]); })])
          .range([height - margin.top - margin.bottom, 0]);

      var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .tickSize(6, 0);

      var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .tickSize(0.5)
          .tickFormat(d3.format(',.1f'));

      var svg = d3.select(this).selectAll("svg").data([datum]);

      var g = svg.enter().append("svg")
          .attr("width", width)
          .attr("height", height*1.1)
          .style("padding", "3px")
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.append("g").attr("class", "bars");
      g.append("g").attr("class", "x axis");
      g.append("g").attr("class", "y axis");

      g = svg.select("g");

      var bar = g.select(".bars").selectAll(".bar")
          .data(data);

      bar.exit().transition()
          .duration(duration)
          .attr("y", height - margin.top - margin.bottom)
          .attr("height", 0)
          .remove();

      bar.enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d){ return xScale(d[0]); })
          .attr("y", height - margin.top - margin.bottom)
          .attr("width", xScale.rangeBand())
          .attr("height", 0)
        .transition()
          .delay(duration)
          .duration(duration)
          .attr("y", function(d){ return yScale(d[1]); })
          .attr("height", function(d){ return height - margin.top - margin.bottom - yScale(d[1]); });

      bar.transition()
          .delay(duration)
          .duration(duration)
          .text(function(d){ return d3.round(yScale(d[1]),1); })
          .attr("y", function(d){ return yScale(d[1]); })
          .attr("height", function(d){ return height - margin.top - margin.bottom - yScale(d[1]); });

      g.select(".x.axis")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .transition()
          .call(xAxis)
          .selectAll("text")
          	.style("text-anchor", "end")
          	.attr("dx", "-0.5em")
          	.attr("dy", "0.1em")
          	.attr("transform", function(d) {
          	return "rotate(-55)"
            });

      g.select(".y.axis")
          .attr("class", "y axis")
        .transition()
          .delay(duration)
          .call(yAxis);

      svg.selectAll("g")
          .classed("g-baseline", function(d) { return d == 0 });

    });
  }

  barchart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return barchart;
  };

  barchart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return barchart;
  };

  barchart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return barchart;
  };

  barchart.padding = function(_) {
    if (!arguments.length) return padding;
    padding = _;
    return barchart;
  };

  barchart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return barchart;
  };

  barchart.tickFormat = function(_) {
    if (!arguments.length) return tickFormat;
    tickFormat = _;
    return barchart;
  };

  barchart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return barchart;
  };

  barchart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return barchart;
  };

  barchart.xDomain = function(_) {
    if (!arguments.length) return xDomain ? xDomain.call(this) : xDomain;
    xDomain = d3.functor(_);
    return barchart;
  };

  barchart.yDomain = function(_) {
    if (!arguments.length) return yDomain ? yDomain.call(this) : yDomain;
    yDomain = d3.functor(_);
    return barchart;
  };

  return barchart;
}