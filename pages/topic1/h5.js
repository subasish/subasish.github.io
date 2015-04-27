var wHV = 500,
    h = 460,
    p = 20,
    rayon = 180;

var dataHV = d3.range(0, 24, .001).map(function(x) {
  return[x, 145+14*Math.cos((2*Math.PI/24)*(x-14))+7*Math.cos(2*(2*Math.PI/24)*(x-9))+3*Math.cos(3*(2*Math.PI/24)*(x-2))];
});

var xScalelHV = d3.scale.linear()
    .domain([0, 24])
    .range([0, wHV]);
var yScalelHV = d3.scale.linear()
    .domain([80, 200])
    .range([h-50, 0]);

var svgLineHV = d3.svg.line()
    .x(function(d) { return xScalelHV(d[0]);})  
    .y(function(d) { return yScalelHV(d[1]);});

var vis1HV = d3.select("#graph5")
      .append('svg')
      .attr("width", wHV+10)
      .attr("height", h + 2*p)
      .append("g")
      .attr("transform", "translate(3," + p + ")")
      .on("mousemove", mousemove1);

    vis1HV.append("rect")
      .attr("class", "background")
      .attr("transform", "translate(" + - p + "," + - p + ")")
      .attr("width", wHV)
      .attr("height", h+2*p)
      .style("fill", "transparent");

    vis1HV.append("rect")
      .attr("class", "low")
      .attr("transform", "translate(0, 375)")
      .attr("width", wHV)
      .attr("height", 35)
      .style("fill", "#a8c8dd")
      .style("opacity", .5);

    vis1HV.append("rect")
      .attr("class", "very-high")
      .attr("transform", "translate(0, 0)")
      .attr("width", wHV)
      .attr("height", 205)
      .style("fill", "#e3c19f")
      .style("opacity", .5);

    vis1HV.append("rect")
      .attr("class", "night")
      .attr("transform", "translate(0, 0)")
      .attr("width", 7*wHV/24)
      .attr("height", h-50)
      .style("fill", "#000000")
      .style("opacity", .1);

    vis1HV.append("rect")
      .attr("class", "night")
      .attr("transform", "translate("+23*wHV/24+", 0)")
      .attr("width", wHV/24)
      .attr("height", h-50)
      .style("fill", "#000000")
      .style("opacity", .1);

for (var j=0; j <= h-100; j=j+(410/12)) {    // xlines
    vis1HV.append("line")
        .attr("x1", 0)
        .attr("y1", j)
        .attr("x2", wHV)
        .attr("y2", j)
        .style("stroke", "#000000")
        .style("opacity", 0.1)
        .style("stroke-width", 1);           
};
 
for (var j=0; j <= wHV; j=j+(wHV/24)) {     // ylines
    vis1HV.append("line")
        .attr("x1", j)
        .attr("y1", 0)
        .attr("x2", j)
        .attr("y2", h-50)
        .style("stroke", "#000000")
        .style("opacity", 0.1)
        .style("stroke-width", 1); 
};

var xAxisHV = d3.svg.axis()
                  .scale(xScalelHV)
                  .orient("bottom")
                  .ticks(20);

var yAxisHV = d3.svg.axis()
                  .scale(yScalelHV)
                  .orient("left")
                  .ticks(10);

var lineHV = vis1HV.append("g")
    .datum(dataHV)
    .append("path")
    .attr("class", "line")
    .attr("d", svgLineHV);

vis1HV.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+wHV/2+" ,0)")
    .call(yAxisHV);

vis1HV.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h-p)  + ")")
    .call(xAxisHV);

vis1HV.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", wHV - 50)
    .attr("y", h - p - 5)
    .text("Time (hour)");

vis1HV.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("x", 255)
    .attr("y", -10)
    .attr("dy", ".45em")
    .text("SBP (mmHg)");

var rScaleHV = d3.scale.linear()
    .domain([80, 200])
    .range([30, rayon ]);

var xScaleHV = d3.scale.linear()
    .domain([0, 24])
    .range([0, 2*Math.PI]);

var svgLine2HV = d3.svg.line.radial()
    .radius(function(d) { return rScaleHV(d[1]); })
    .angle(function(d) { return xScaleHV(d[0]); });

var vis2HV = d3.select("#graph5")
    .append("svg")
    .attr("width", 440)
    .attr("height", h)
    .attr("class", "graph")
    .append("g")
    .attr("transform", "translate(220," + (h / 2 - p) + ")")
    .on("mousemove", mousemove2);

  vis2HV.append("rect")
  .attr("transform", "translate(220," + -(h / 2 - p) + ")")
  .attr("width", 440)
  .attr("height", h)
  .style("fill", "transparent");

var datazone= [1];

var pie = d3.layout.pie()
    .sort(null);

var higharc = d3.svg.arc()
    .innerRadius(rScaleHV(80))
    .outerRadius(rScaleHV(90));

var highline= vis2HV.selectAll(".highline").data(pie(datazone)).enter().append("path")
      .attr("class", "highline")
      .attr("d", higharc);

var ccircle = vis2HV.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 30)
    .attr("fill", "#a8c8dd")
    .attr("opacity", .5);

var veryhigharc = d3.svg.arc()
    .innerRadius(rScaleHV(140))
    .outerRadius(rScaleHV(200));

var veryhighline= vis2HV.selectAll(".veryhighline").data(pie(datazone)).enter().append("path")
      .attr("class", "veryhighline")
      .attr("d", veryhigharc);

var datanight = [7,17];
var colornight = ["#000000", "#ffffff"];

var arcnight = d3.svg.arc()
    .innerRadius(rScaleHV(80))
    .outerRadius(rScaleHV(200))
    .startAngle(-(2*Math.PI/25));

var night= vis2HV.selectAll(".nightarc").data(pie(datanight)).enter().append("path")
      .attr("class", "nightarc")
      .style("fill", function (d,i){return colornight[i];})
      .style("opacity", .1) 
      .attr("d", arcnight);

var gr = vis2HV.append("g")
    .attr("class", "r axis")
  .selectAll("g")
    .data(rScaleHV.ticks(5))
  .enter().append("g");

gr.append("circle")
    .attr("r", rScaleHV);

gr.append("text")
    .attr("y", function(d) { return -rScaleHV(d) - 4; })
    .attr("transform", "rotate(7)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

var ga = vis2HV.append("g")
    .attr("class", "a axis")
  .selectAll("g")
    .data(d3.range(0, 360, 15))
  .enter().append("g")
    .attr("transform", function(d) { return "rotate(" + (d-90) + ")"; });

ga.append("line")
    .attr("x1", 30)
    .attr("x2", rayon);

ga.append("text")
    .attr("x", rayon + 6)
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d > 180 && d < 360 ? "end" : null; })
    .attr("transform", function(d) { return d > 180 && d < 360 ? "rotate(180 " + (rayon + 6) + ",0)" : null; })
    .text(function(d) { return d/15 + "hr"; });

var line2HV = vis2HV.append("path")
    .datum(dataHV)
    .attr("class", "line")
    .attr("d", svgLine2HV);

var circleguide = vis1HV.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 0)
      .attr("fill", "#000000");

var circleguide2 = vis2HV.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 0)
      .attr("fill", "#000000");

function mousemove2() {

      var mouse = d3.mouse(this);
      var mx = mouse[0];
      var my = mouse[1];

      var omega = Math.atan2(mx, my);

      var index = Math.round(1000*(xScaleHV.invert(-omega)+12)); /// annule xScale !!! -omega inverse haut-bas et +12 permet de faire le tour complet    
      var d = dataHV[index];

      var r = rScaleHV(d[1]);

      var nx=r*Math.sin(omega);
      var ny=r*Math.cos(omega);

      var lx= xScalelHV(d[0]);  
      var ly= yScalelHV(d[1]);

    circleguide.attr("opacity", 1)
      .attr("cx", lx)
      .attr("cy", ly)
      .attr("r", 4)

    circleguide2.data(d).attr("opacity", 1)
      .attr("cx", nx)
      .attr("cy", ny)
      .attr("r", 4)
};

function mousemove1(){

  var xScaleHV = d3.scale.linear()
    .domain([0, 24])
    .range([0, 2*Math.PI]);

  var rScaleHV = d3.scale.linear()
    .domain([80, 200])
    .range([30, rayon ]); 

  var mouse = d3.mouse(this);
  var mx = mouse[0];
  var my = mouse[1];

  var index = Math.round(1000*(xScalelHV.invert(mx))); /// annule xScalel sur les valeures renvoyées par mouse(this)
  var d = dataHV[index]; /// d est une array avec les valeures x,y originales

  var r = rScaleHV(d[1]); // on repasse une echelle pour obtenir le rayon 
  var omega = xScaleHV(d[0]); /// on repasse une echelle pour obtenir l'angle

  var nx=r*Math.sin(omega); // nous donne la position x  !!!! attention on utilise sin et non cos pour modifier de 90° 
  var ny=r*Math.cos(omega);  // nous donne la position y !!!! voir au dessus

  var lx= xScalelHV(d[0]);  
  var ly= yScalelHV(d[1]);

  circleguide.attr("opacity", 1)
      .attr("cx", lx)
      .attr("cy", ly)
      .attr("r", 4)
     

  circleguide2.data(d).attr("opacity", 1)
      .attr("cx", nx)
      .attr("cy", -ny)  ////!!!!  entraine une inversion haut-bas de la valeure y (sinon elle partirait du bas)
      .attr("r", 4)

};