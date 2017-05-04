var w = 600,
    h = 460,
    p = 20;

var dur = 5000;
var delay = 2500;

var dataHI = d3.range(0, 24, .001).map(function(x) {
  return[x, 145+14*Math.cos((2*Math.PI/24)*(x-14))+7*Math.cos((2*2*Math.PI/24)*(x-9))+3*Math.cos((3*2*Math.PI/24)*(x-2))];
});

var xScalelHI = d3.scale.linear()
    .domain([0, 24])
    .range([0, w]);
var yScalelHI = d3.scale.linear()
    .domain([80, 200])
    .range([h-50, 0]);

var svgLineHI = d3.svg.line()
    .x(function(d) { return xScalelHI(d[0]);})  
    .y(function(d) { return yScalelHI(d[1]);});

var vis1 = d3.select("#graph1")
      .append('svg')
      .attr("width", w +2*p)
      .attr("height", h + 2*p)
      .append("g")
      .attr("transform", "translate(3," + p + ")");

    vis1.append("rect")
      .attr("transform", "translate(-3," + - p + ")")
      .attr("width", w+2*p)
      .attr("height", h+2*p)
      .style("fill", "transparent");

    vis1.append("rect")
      .attr("class", "highline")
      .attr("transform", "translate(0, 375)")
      .attr("width", w)
      .attr("height", 35)
      .style("opacity", 0)
      .transition()
      .duration(dur)
      .style("opacity", .5);

    vis1.append("rect")
      .attr("class", "veryhighline")
      .attr("transform", "translate(0, 0)")
      .attr("width", w)
      .attr("height", 205)
      .style("opacity", 0)
      .transition()
      .duration(dur)
      .style("opacity", .5);

    vis1.append("rect")
      .attr("class", "night")
      .attr("transform", "translate(0, 0)")
      .attr("width", 7*w/24)
      .attr("height", h-50)
      .style("opacity", 0)
      .transition()
      .delay(delay)
      .duration(dur)
      .style("opacity", .2);

    vis1.append("rect")
      .attr("class", "night")
      .attr("transform", "translate("+23*w/24+", 0)")
      .attr("width", w/24)
      .attr("height", h-50)
      .style("opacity", 0)
      .transition()
      .delay(delay)
      .duration(dur)
      .style("opacity", .2);

  vis1.append("image")
    .attr("xlink:href", "./sun.png")
    .attr("width", 75)
    .attr("height", 75)
    .attr("opacity", 0)
    .attr("transform", "translate(350,35)")
    .transition()
    .duration(dur)
    .attr("opacity", 1);

  vis1.append("circle")
      .attr("cx", xScalelHI(3))
      .attr("cy", yScalelHI(180))
      .attr("r", 25)
      .attr("opacity", 0)
      .transition()
      .delay(delay)
      .duration(dur)
      .style("opacity", 1);

for (var j=0; j <= h-50; j=j+(410/12)) {    // xlines
    vis1.append("line")
        .attr("x1", 0)
        .attr("y1", j)
        .attr("x2", w)
        .attr("y2", j)
        .style("stroke", "#000000")
        .style("opacity", 0.1)
        .style("stroke-width", 1);           
};
 
for (var j=0; j <= w; j=j+(600/24)) {     // ylines
    vis1.append("line")
        .attr("x1", j)
        .attr("y1", 0)
        .attr("x2", j)
        .attr("y2", h-50)
        .style("stroke", "#000000")
        .style("opacity", 0.1)
        .style("stroke-width", 1); 
};

var xAxis = d3.svg.axis()
                  .scale(xScalelHI)
                  .orient("bottom")
                  .ticks(20);

var yAxis = d3.svg.axis()
                  .scale(yScalelHI)
                  .orient("left")
                  .ticks(10);

var lineHI = vis1.append("g")
    .datum(dataHI)
    .append("path")
    .attr("class", "line")
    .attr("d", svgLineHI);

vis1.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+w/2+" ,0)")
    .call(yAxis);

vis1.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h-p)  + ")")
    .call(xAxis);

vis1.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w - 50)
    .attr("y", h - p - 5)
    .text("Time (hour)");

vis1.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("x", 335)
    .attr("y", -10)
    .attr("dy", ".45em")
    .text("SBP (mmHg)");

vis1.append("line")
    .attr("x1", w-50)
    .attr("x2", w+2*p)
    .attr("y1", 85)
    .attr("y2", 85)
    .style("stroke", "#ca8546")
    .style("stroke-width", 2)
    .style("opacity", 0)
    .transition()
    .duration(dur)
    .style("opacity", 1);

vis1.append("line")
    .attr("x1", w-50)
    .attr("x2", w+2*p)
    .attr("y1", 270)
    .attr("y2", 270)
    .style("stroke", "#000000")
    .style("stroke-width", 2)
    .style("opacity", 0)
    .transition()
    .duration(dur)
    .style("opacity", .5);

var vis2 = d3.select("#graph1")
      .append('svg')
      .attr("width", 250)
      .attr("height", 500)
      .append("g")
      .attr("transform", "translate(0, "+ p + ")");

  vis2.append("rect")
      .attr("width", 220)
      .attr("height", 170)
      .style("fill", "#e3c19f")
      .style("opacity", 0)
      .transition()
      .duration(dur)
      .style("opacity", .5);

  vis2.append('foreignObject')
      .attr('x', 10)
      .attr('y', 25)
      .attr('width', 210)
      .attr('height', 155)
      .append("xhtml:graph1")
      .html('<div style="font-size: 12px">Hypertension is a condition characterized by SBP persistently at or above 140 mmHg for (respectively 90 mmHg for DBP). Severe hypertensive subjects with SBP>150 mmHg are exposed to high risks of cardiovascular event.</div>')
      .style("opacity", 0)
      .transition()
      .duration(dur)
      .style("opacity", 1);

  vis2.append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", 170)
      .style("stroke", "#ca8546")
      .style("stroke-width", 4)
      .style("opacity", 0)
      .transition()
      .duration(dur)
      .style("opacity", 1);

  vis2.append("rect")
      .attr("width", 220)
      .attr("height", 80)
      .attr("transform", "translate(0, 230)")
      .style("fill", "#000000")
      .style("opacity", 0)
      .transition()
      .duration(dur)
      .style("opacity", .05);

  vis2.append('foreignObject')
      .attr('x', 10)
      .attr('y', 250)
      .attr('width', 210)
      .attr('height', 145)
      .append("xhtml:graph1")
      .html("<div style='font-size: 12px'>Normal SBP at rest is within the range 90-140 mmHg.</div>")
      .style("opacity", 0)
      .transition()
      .duration(dur)
      .style("opacity", 1);

  vis2.append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 230)
      .attr("y2", 310)
      .style("stroke", "#000000")
      .style("stroke-width", 4)
      .style("opacity", 0)
      .transition()
      .duration(dur)
      .style("opacity", .5);