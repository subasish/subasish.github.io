var w = 600,
    h = 460,
    p = 20;

var data1HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 125+14*Math.cos((2*Math.PI/24)*(x-14))+8*Math.cos(2*(2*Math.PI/24)*(x-9))+3*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data11HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 145+14*Math.cos((2*Math.PI/24)*(x-14))+8*Math.cos(2*(2*Math.PI/24)*(x-8))+3*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data2HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 136+9*Math.cos((2*Math.PI/24)*(x-14))+5*Math.cos(2*(2*Math.PI/24)*(x-9))+2*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data21HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 119+8*Math.cos((2*Math.PI/24)*(x-14))+4*Math.cos(2*(2*Math.PI/24)*(x-8))+Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data3HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 120+7*Math.cos((2*Math.PI/24)*(x-14))+3*Math.cos(2*(2*Math.PI/24)*(x-9))+2*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data31HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 119+12*Math.cos((2*Math.PI/24)*(x-14))+5*Math.cos(2*(2*Math.PI/24)*(x-8))+3*Math.cos(3*(2*Math.PI/24)*(x-3))];
});

var data4HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 141+11*Math.cos((2*Math.PI/24)*(x-14))+6*Math.cos(2*(2*Math.PI/24)*(x-9))+1*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data41HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 121+6*Math.cos((2*Math.PI/24)*(x-14))+5*Math.cos(2*(2*Math.PI/24)*(x-9))+1*Math.cos(3*(2*Math.PI/24)*(x-3))];
});

var data5HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 135+10*Math.cos((2*Math.PI/24)*(x-14))+7*Math.cos(2*(2*Math.PI/24)*(x-9))+2*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data51HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 131+10*Math.cos((2*Math.PI/24)*(x-14))+7*Math.cos(2*(2*Math.PI/24)*(x-8))+2*Math.cos(3*(2*Math.PI/24)*(x-4))];
});

var data6HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 149+14*Math.cos((2*Math.PI/24)*(x-14))+8*Math.cos(2*(2*Math.PI/24)*(x-9))+3*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data61HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 122+6*Math.cos((2*Math.PI/24)*(x-14))+4*Math.cos(2*(2*Math.PI/24)*(x-8))+2*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data7HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 144+11*Math.cos((2*Math.PI/24)*(x-14))+5*Math.cos(2*(2*Math.PI/24)*(x-9))+4*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data71HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 124+11*Math.cos((2*Math.PI/24)*(x-14))+5*Math.cos(2*(2*Math.PI/24)*(x-9))+4*Math.cos(3*(2*Math.PI/24)*(x-3))];
});

var data8HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 140+12*Math.cos((2*Math.PI/24)*(x-14))+9*Math.cos(2*(2*Math.PI/24)*(x-9))+2*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data81HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 110+12*Math.cos((2*Math.PI/24)*(x-14))+9*Math.cos(2*(2*Math.PI/24)*(x-8))+2*Math.cos(3*(2*Math.PI/24)*(x-1))];
});

var data9HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 136+9*Math.cos((2*Math.PI/24)*(x-14))+6*Math.cos(2*(2*Math.PI/24)*(x-9))+1*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data91HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 116+10*Math.cos((2*Math.PI/24)*(x-14))+8*Math.cos(2*(2*Math.PI/24)*(x-7))+3*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data10HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 117+11*Math.cos((2*Math.PI/24)*(x-14))+6*Math.cos(2*(2*Math.PI/24)*(x-9))+4*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var data101HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 139+14*Math.cos((2*Math.PI/24)*(x-14))+6*Math.cos(2*(2*Math.PI/24)*(x-6))+4*Math.cos(3*(2*Math.PI/24)*(x-3))];
});

var data111HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 125+11*Math.cos((2*Math.PI/24)*(x-14))+9*Math.cos(2*(2*Math.PI/24)*(x-6))+2*Math.cos(3*(2*Math.PI/24)*(x-6))];
});

var data211HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 155+17*Math.cos((2*Math.PI/24)*(x-14))+10*Math.cos(2*(2*Math.PI/24)*(x-9))+8*Math.cos(3*(2*Math.PI/24)*(x-4))];
});

var data311HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 122+14*Math.cos((2*Math.PI/24)*(x-10))+5*Math.cos(2*(2*Math.PI/24)*(x-3))+2*Math.cos(3*(2*Math.PI/24)*(x-1))];
});

var data411HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 113+6*Math.cos((2*Math.PI/24)*(x-18))+4*Math.cos(2*(2*Math.PI/24)*(x-8))+2*Math.cos(3*(2*Math.PI/24)*(x-1))];
});

var data511HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 148+12*Math.cos((2*Math.PI/24)*(x-11))+9*Math.cos(2*(2*Math.PI/24)*(x-6))+5*Math.cos(3*(2*Math.PI/24)*(x-5))];
});

var data611HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 151+15*Math.cos((2*Math.PI/24)*(x-10))+7*Math.cos(2*(2*Math.PI/24)*(x-5))+4*Math.cos(5*(2*Math.PI/24)*(x-2))];
});

var data711HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 116+12*Math.cos((2*Math.PI/24)*(x-11))+8*Math.cos(2*(2*Math.PI/24)*(x-4))+3*Math.cos(5*(2*Math.PI/24)*(x-1))];
});

var data811HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 124+16*Math.cos((2*Math.PI/24)*(x-16))+9*Math.cos(3*(2*Math.PI/24)*(x-8))+6*Math.cos(2*(2*Math.PI/24)*(x-5))];
});

var data911HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 119+11*Math.cos((2*Math.PI/24)*(x-19))+5*Math.cos(2*(2*Math.PI/24)*(x-7))+4*Math.cos(4*(2*Math.PI/24)*(x-2))];
});

var data1011HII = d3.range(0, 24, .1).map(function(x) {
  return[x, 133+13*Math.cos((2*Math.PI/24)*(x-13))+7*Math.cos(4*(2*Math.PI/24)*(x-7))+3*Math.cos(3*(2*Math.PI/24)*(x-3))];
});

var xScalelHII = d3.scale.linear()
    .domain([0, 24])
    .range([0, w]);
var yScalelHII = d3.scale.linear()
    .domain([80, 200])
    .range([h-50, 0]);

var svgLine1HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine2HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine3HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine4HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine5HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine6HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine7HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine8HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine9HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine10HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine11HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine21HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine31HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine41HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine51HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine61HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine71HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine81HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine91HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine101HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine111HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine211HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine311HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine411HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine511HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine611HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine711HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine811HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine911HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});

var svgLine1011HII = d3.svg.line()
    .x(function(d) { return xScalelHII(d[0]);})  
    .y(function(d) { return yScalelHII(d[1]);});
var svgHII = d3.select("#graph2")
        .append('svg')
        .attr("width", w +2*p)
        .attr("height", h + 2*p)
        .append("g")
        .attr("transform", "translate(3 ," + p + ")");

    svgHII.append("rect")
        .attr("class", "highline")
        .attr("transform", "translate(0, 375)")
        .attr("width", w)
        .attr("height", 35);

    svgHII.append("rect")
        .attr("class", "veryhighline")
        .attr("transform", "translate(0, 0)")
        .attr("width", w)
        .attr("height", 205);

    svgHII.append("rect")
        .attr("class", "night")
        .attr("transform", "translate(0, 0)")
        .attr("width", 7*w/24)
        .attr("height", h-50);

    svgHII.append("rect")
        .attr("class", "night")
        .attr("transform", "translate("+23*w/24+", 0)")
        .attr("width", w/24)
        .attr("height", h-50);

for (var j=0; j <= h-50; j=j+(410/12)) {    // xlines
    svgHII.append("line")
        .attr("x1", 0)
        .attr("y1", j)
        .attr("x2", w)
        .attr("y2", j)
        .style("stroke", "#000000")
        .style("opacity", 0.1)
        .style("stroke-width", 1);           
};
 
for (var j=0; j <= w; j=j+(600/24)) {     // ylines
    svgHII.append("line")
        .attr("x1", j)
        .attr("y1", 0)
        .attr("x2", j)
        .attr("y2", h-50)
        .style("stroke", "#000000")
        .style("opacity", 0.1)
        .style("stroke-width", 1); 
};

var xAxisHII = d3.svg.axis()
                  .scale(xScalelHII)
                  .orient("bottom")
                  .ticks(20);

var yAxisHII = d3.svg.axis()
                  .scale(yScalelHII)
                  .orient("left")
                  .ticks(10);
  
var group = svgHII.append("g");
  
var path1HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#ca8546")
  .attr("d", svgLine1HII(data1HII));

var path2HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#5e93bc")
  .attr("d", svgLine2HII(data2HII));

var path3HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#d7191c")
  .attr("d", svgLine3HII(data3HII));

var path4HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine4HII(data4HII));

var path5HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#d7191c")
  .attr("d", svgLine5HII(data5HII));

var path6HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#ca8546")
  .attr("d", svgLine6HII(data6HII));

var path7HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine7HII(data7HII));

var path8HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#d7191c")
  .attr("d", svgLine8HII(data8HII));

var path9HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#5e93bc")
  .attr("d", svgLine9HII(data9HII));

var path10HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine10HII(data10HII));

var path11HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#5e93bc")
  .attr("d", svgLine11HII(data11HII));

var path21HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine21HII(data21HII));

var path31HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#5e93bc")
  .attr("d", svgLine31HII(data31HII));

var path41HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine41HII(data41HII));

var path51HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#d7191c")
  .attr("d", svgLine51HII(data51HII));

var path61HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine61HII(data61HII));

var path71HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#ca8546")
  .attr("d", svgLine71HII(data71HII));

var path81HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#d7191c")
  .attr("d", svgLine81HII(data81HII));

var path91HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine91HII(data91HII));

var path101HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#5e93bc")
  .attr("d", svgLine101HII(data101HII));

var path111HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#5e93bc")
  .attr("d", svgLine11HII(data11HII));

var path211HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine21HII(data21HII));

var path311HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#5e93bc")
  .attr("d", svgLine31HII(data31HII));

var path411HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine41HII(data41HII));

var path511HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#d7191c")
  .attr("d", svgLine51HII(data51HII));

var path611HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine61HII(data61HII));

var path711HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#ca8546")
  .attr("d", svgLine71HII(data71HII));

var path811HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#d7191c")
  .attr("d", svgLine81HII(data81HII));

var path911HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#58495e")
  .attr("d", svgLine91HII(data91HII));

var path1011HII = group.append("path")
  .attr("class", "animHII")
  .attr("stroke", "#5e93bc")
  .attr("d", svgLine101HII(data101HII));
    
var len1 = path1HII.node().getTotalLength();
var len2 = path2HII.node().getTotalLength();
var len3 = path3HII.node().getTotalLength();
var len4 = path4HII.node().getTotalLength();
var len5 = path5HII.node().getTotalLength();
var len6 = path6HII.node().getTotalLength();
var len7 = path7HII.node().getTotalLength();
var len8 = path8HII.node().getTotalLength();
var len9 = path9HII.node().getTotalLength();
var len10 = path10HII.node().getTotalLength();
var len11 = path11HII.node().getTotalLength();
var len21 = path21HII.node().getTotalLength();
var len31 = path31HII.node().getTotalLength();
var len41 = path41HII.node().getTotalLength();
var len51 = path51HII.node().getTotalLength();
var len61 = path61HII.node().getTotalLength();
var len71 = path71HII.node().getTotalLength();
var len81 = path81HII.node().getTotalLength();
var len91 = path91HII.node().getTotalLength();
var len101 = path101HII.node().getTotalLength();
var len111 = path111HII.node().getTotalLength();
var len211 = path211HII.node().getTotalLength();
var len311 = path311HII.node().getTotalLength();
var len411 = path411HII.node().getTotalLength();
var len511 = path511HII.node().getTotalLength();
var len611 = path611HII.node().getTotalLength();
var len711 = path711HII.node().getTotalLength();
var len811 = path811HII.node().getTotalLength();
var len911 = path911HII.node().getTotalLength();
var len1011 = path1011HII.node().getTotalLength();

var offset = 0;

path1HII.attr({
  "stroke-dasharray": len1,
  "stroke-dashoffset": len1
})
path2HII.attr({
  "stroke-dasharray": len2,
  "stroke-dashoffset": len2
})
path3HII.attr({
  "stroke-dasharray": len3,
  "stroke-dashoffset": len3
})
path4HII.attr({
  "stroke-dasharray": len4,
  "stroke-dashoffset": len4
})
path5HII.attr({
  "stroke-dasharray": len5,
  "stroke-dashoffset": len5
})
path6HII.attr({
  "stroke-dasharray": len6,
  "stroke-dashoffset": len6
})
path7HII.attr({
  "stroke-dasharray": len7,
  "stroke-dashoffset": len7
})
path8HII.attr({
  "stroke-dasharray": len8,
  "stroke-dashoffset": len8
})
path9HII.attr({
  "stroke-dasharray": len9,
  "stroke-dashoffset": len9
})
path10HII.attr({
  "stroke-dasharray": len10,
  "stroke-dashoffset": len10
})

path11HII.attr({
  "stroke-dasharray": len11,
  "stroke-dashoffset": len11
})
path21HII.attr({
  "stroke-dasharray": len21,
  "stroke-dashoffset": len21
})
path31HII.attr({
  "stroke-dasharray": len31,
  "stroke-dashoffset": len31
})
path41HII.attr({
  "stroke-dasharray": len41,
  "stroke-dashoffset": len41
})
path51HII.attr({
  "stroke-dasharray": len51,
  "stroke-dashoffset": len51
})
path61HII.attr({
  "stroke-dasharray": 2*len61,
  "stroke-dashoffset": len61
})
path71HII.attr({
  "stroke-dasharray": 2*len71,
  "stroke-dashoffset": len71
})
path81HII.attr({
  "stroke-dasharray": 2*len81,
  "stroke-dashoffset": len81
})
path91HII.attr({
  "stroke-dasharray": 2*len91,
  "stroke-dashoffset": len91
})
path101HII.attr({
  "stroke-dasharray": 2*len101,
  "stroke-dashoffset": len101
})

path111HII.attr({
  "stroke-dasharray": 2*len111,
  "stroke-dashoffset": len111
})
path211HII.attr({
  "stroke-dasharray": 2*len211,
  "stroke-dashoffset": len211
})
path311HII.attr({
  "stroke-dasharray": 2*len311,
  "stroke-dashoffset": len311
})
path411HII.attr({
  "stroke-dasharray": 2*len411,
  "stroke-dashoffset": len411
})
path511HII.attr({
  "stroke-dasharray": 2*len511,
  "stroke-dashoffset": len511
})
path611HII.attr({
  "stroke-dasharray": 2*len611,
  "stroke-dashoffset": len611
})
path711HII.attr({
  "stroke-dasharray": 2*len711,
  "stroke-dashoffset": len711
})
path811HII.attr({
  "stroke-dasharray": 2*len811,
  "stroke-dashoffset": len811
})
path911HII.attr({
  "stroke-dasharray": 2*len911,
  "stroke-dashoffset": len911
})
path1011HII.attr({
  "stroke-dasharray": 2*len1011,
  "stroke-dashoffset": len1011
})

d3.select("#transition1").on("click", click);   

 function click() {
      var dur = 5000;
      path1HII.transition()
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
	          return ((2*len1*(1-t))+len1);}
        })

      path11HII.transition()
        .delay(500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len11*(1-t))+len11);}
        })

      path2HII.transition()
        .delay(1000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len2*(1-t))+len2);}
        })

      path3HII.transition()
        .delay(1500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len3*(1-t))+len3);}
        })

      path4HII.transition()
        .delay(2000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len4*(1-t))+len4);}
        })

      path31HII.transition()
        .delay(2500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len31*(1-t))+len31);}
        })

      path41HII.transition()
        .delay(3000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len41*(1-t))+len41);}
        })

      path5HII.transition()
        .delay(3500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len5*(1-t))+len5);}
        })

      path61HII.transition()
        .delay(4000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len61*(1-t))+len61);}
        })

      path6HII.transition()
        .delay(4500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len6*(1-t))+len6);}
        })

      path7HII.transition()
        .delay(5000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len7*(1-t))+len7);}
        })

      path81HII.transition()
        .delay(5500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len81*(1-t))+len81);}
        })

      path91HII.transition()
        .delay(6000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len91*(1-t))+len91);}
        })

      path101HII.transition()
        .delay(6500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len101*(1-t))+len101);}
        })

      path8HII.transition()
        .delay(7000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len8*(1-t))+len8);}
        })

      path9HII.transition()
        .delay(7500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len9*(1-t))+len9);}
        })

      path10HII.transition()
        .delay(8000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len10*(1-t))+len10);}
        })      

      path21HII.transition()
        .delay(8500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len21*(1-t))+len21);}
        })

      path51HII.transition()
        .delay(9000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len51*(1-t))+len51);}
        })
    
      path71HII.transition()
        .delay(9500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len71*(1-t))+len71);}
        })

      path111HII.transition()
        .delay(10000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len111*(1-t))+len111);}
        })

      path211HII.transition()
        .delay(10500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len211*(1-t))+len211);}
        })

      path311HII.transition()
        .delay(11000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len311*(1-t))+len311);}
        })

      path411HII.transition()
        .delay(11500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len411*(1-t))+len411);}
        })

      path511HII.transition()
        .delay(12000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len511*(1-t))+len511);}
        })

      path611HII.transition()
        .delay(12500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len611*(1-t))+len611);}
        })

      path711HII.transition()
        .delay(13000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len711*(1-t))+len711);}
        })      

      path811HII.transition()
        .delay(13500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len811*(1-t))+len811);}
        })

      path911HII.transition()
        .delay(14000)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len911*(1-t))+len911);}
        })
    
      path1011HII.transition()
        .delay(14500)
        .duration(dur)
        .attrTween("stroke-dashoffset", function(d,i) {
          return function(t) {
            return ((2*len1011*(1-t))+len1011);}
        })    
    }

  svgHII.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+w/2+" ,0)")
    .call(yAxisHII);

  svgHII.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h-p)  + ")")
    .call(xAxisHII);

  svgHII.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w - 50)
    .attr("y", h - p - 5)
    .text("Time (hour)");

  svgHII.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("x", 325)
    .attr("y", -10)
    .attr("dy", ".45em")
    .text("SBP (mmHg)");