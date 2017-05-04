var w = 600,
    h = 460,
    p = 20;

var color={
  0:"#d7191c",
  0.4:"#5e93bc",
  2:"#000000",
  10:"#ca8546"
};

var xScalelHIII = d3.scale.linear()
    .domain([0, 24])
    .range([0, w]);

var yScalelHIII = d3.scale.linear()
    .domain([80, 200])
    .range([h-50, 0]);
 
var svgHIII = d3.select("#graph3")
      .append('svg')
      .attr("width", w +2*p)
      .attr("height", h + 2*p)
      .attr("class", "graph")
      .append("g")
      .attr("transform", "translate(3 ," + p + ")");

    svgHIII.append("rect")
      .attr("class", "highline")
      .attr("transform", "translate(0, 375)")
      .attr("width", w)
      .attr("height", 35);

    svgHIII.append("rect")
      .attr("class", "veryhighline")
      .attr("transform", "translate(0, 0)")
      .attr("width", w)
      .attr("height", 205)

    svgHIII.append("rect")
      .attr("class", "night")
      .attr("transform", "translate(0, 0)")
      .attr("width", 7*w/24)
      .attr("height", h-50);

    svgHIII.append("rect")
      .attr("class", "night")
      .attr("transform", "translate("+23*w/24+", 0)")
      .attr("width", w/24)
      .attr("height", h-50);

for (var j=0; j <= h-50; j=j+(410/12)) {    // xlines
    svgHIII.append("line")
        .attr("x1", 0)
        .attr("y1", j)
        .attr("x2", w)
        .attr("y2", j)
        .style("stroke", "#000000")
        .style("opacity", 0.1)
        .style("stroke-width", 1);           
};
 
for (var j=0; j <= w; j=j+(600/24)) {     // ylines
    svgHIII.append("line")
        .attr("x1", j)
        .attr("y1", 0)
        .attr("x2", j)
        .attr("y2", h-50)
        .style("stroke", "#000000")
        .style("opacity", 0.1)
        .style("stroke-width", 1); 
};

d3.csv("./SBPdots.csv", function(dataHIII) {

  var circleHIII=svgHIII.selectAll("circleHIII")
     .data(dataHIII)
   .enter().append("circle")
      .attr("class", "circleHIII")
     .attr("fill", function(d) { return color[d.dose]; })
     .attr("opacity", 0)
     .attr("cx", function(d) { return xScalelHIII(d.tnoise); })
     .attr("cy", function(d) { return yScalelHIII(d.sbp); })
     .attr("r", 2);   

     circleHIII.filter(function(p) {return p.dose === "0";})
          .style("opacity", 1);

  d3.select("#plbogrpHIII").on("click", dose);
  d3.select("#grp1HIII").on("click", dose);
  d3.select("#grp2HIII").on("click", dose);
  d3.select("#grp3HIII").on("click", dose);

  function dose(){

    if (d3.select("#plbogrpHIII").property("checked")) {
      circleHIII.filter(function(p) {return p.dose === "0";})
          .style("opacity", 1)
    }else{
      circleHIII.filter(function(p) {return p.dose === "0";})
          .style("opacity", 0)
    }
     if (d3.select("#grp1HIII").property("checked")) {
      circleHIII.filter(function(p) {return p.dose === "0.4";})
          .style("opacity", 1)
    }else{
      circleHIII.filter(function(p) {return p.dose === "0.4";})
          .style("opacity", 0)
    }
     if (d3.select("#grp2HIII").property("checked")) {
      circleHIII.filter(function(p) {return p.dose === "2";})
          .style("opacity", 1)
    }else{
      circleHIII.filter(function(p) {return p.dose === "2";})
          .style("opacity", 0)
    }
     if (d3.select("#grp3HIII").property("checked")) {
      circleHIII.filter(function(p) {return p.dose === "10";})
          .style("opacity", 1)
    }else{
      circleHIII.filter(function(p) {return p.dose === "10";})
          .style("opacity", 0)
    }
  };  
});

var config1HIII = { "MESOR": 145.0, "Amp1": 14, "Phz1": 14, "Amp2": 7, "Phz2": 9, "Amp3": 3, "Phz3": 2};
var config2HIII = { "MESOR": 143.9, "Amp1": 14, "Phz1": 14, "Amp2": 7, "Phz2": 9, "Amp3": 3, "Phz3": 2};
var config3HIII = { "MESOR": 130.5, "Amp1": 14, "Phz1": 14, "Amp2": 7, "Phz2": 9, "Amp3": 3, "Phz3": 2};
var config4HIII = { "MESOR": 117.1, "Amp1": 14, "Phz1": 14, "Amp2": 7, "Phz2": 9, "Amp3": 3, "Phz3": 2};

var domain = _.range(0, 24, 0.01);

d3.select("#model1HIII").on("click", choose);
d3.select("#model2HIII").on("click", choose);
d3.select("#model3HIII").on("click", choose);
d3.select("#model4HIII").on("click", choose);

var graphHIII = function(f) {
  var all;
  all = _.map(domain, function(x) {
    return {
      x: x,
      y: f(x)
    };
  }); 
    return all.filter(function (x){return x.y<200;})
};

var funcs = {
  model1HIII : function(x){
    return (config1HIII["MESOR"]+config1HIII["Amp1"]*Math.cos((2*Math.PI/24)*(x-config1HIII["Phz1"]))+config1HIII["Amp2"]*Math.cos((2*2*Math.PI/24)*(x-config1HIII["Phz2"]))+config1HIII["Amp3"]*Math.cos((3*2*Math.PI/24)*(x-config1HIII["Phz3"])));
  },
  model2HIII : function(x){
    return (config2HIII["MESOR"]+config2HIII["Amp1"]*Math.cos((2*Math.PI/24)*(x-config2HIII["Phz1"]))+config2HIII["Amp2"]*Math.cos((2*2*Math.PI/24)*(x-config2HIII["Phz2"]))+config2HIII["Amp3"]*Math.cos((3*2*Math.PI/24)*(x-config2HIII["Phz3"])));
  },
  model3HIII : function(x){
    return (config3HIII["MESOR"]+config3HIII["Amp1"]*Math.cos((2*Math.PI/24)*(x-config3HIII["Phz1"]))+config3HIII["Amp2"]*Math.cos((2*2*Math.PI/24)*(x-config3HIII["Phz2"]))+config3HIII["Amp3"]*Math.cos((3*2*Math.PI/24)*(x-config3HIII["Phz3"])));
  },
  model4HIII : function(x){
    return (config4HIII["MESOR"]+config4HIII["Amp1"]*Math.cos((2*Math.PI/24)*(x-config4HIII["Phz1"]))+config4HIII["Amp2"]*Math.cos((2*2*Math.PI/24)*(x-config4HIII["Phz2"]))+config4HIII["Amp3"]*Math.cos((3*2*Math.PI/24)*(x-config4HIII["Phz3"])));
  }
}

var svgLineHIII = d3.svg.line()
    .x(function(d) { return xScalelHIII(d.x);})  
    .y(function(d) { return yScalelHIII(d.y);});

var model1HIII = svgHIII.append("g")
    .data([graphHIII(funcs.model1HIII)])
    .append("path")
    .style("stroke", "#ac1416")
    .style("stroke-width", 2)
    .style("fill", "none")
    .style("opacity", 0)
    .attr("d", svgLineHIII);

var model2HIII = svgHIII.append("g")
    .data([graphHIII(funcs.model2HIII)])
    .append("path")
    .style("fill", "none")
    .style("stroke-width", 2)
    .style("stroke", "#416683")
    .style("opacity", 0)
    .attr("d", svgLineHIII);

var model3HIII = svgHIII.append("g")
    .data([graphHIII(funcs.model3HIII)])
    .append("path")
    .style("fill", "none")
    .style("stroke-width", 2)
    .style("stroke", "#000000")
    .style("opacity", 0)
    .attr("d", svgLineHIII);

var model4HIII = svgHIII.append("g")
    .data([graphHIII(funcs.model4HIII)])
    .append("path")
    .style("fill", "none")
    .style("stroke-width", 2)
    .style("stroke", "#a16a38")
    .style("opacity", 0)
    .attr("d", svgLineHIII);

function choose(){
    if (d3.select("#model1HIII").property("checked")) {
          model1HIII.style("opacity", 1)
    }else{
          model1HIII.style("opacity", 0)
    }
     if (d3.select("#model2HIII").property("checked")) {
          model2HIII.style("opacity", 1)
    }else{
          model2HIII.style("opacity", 0)
    }
     if (d3.select("#model3HIII").property("checked")) {
          model3HIII.style("opacity", 1)
    }else{
          model3HIII.style("opacity", 0)
    }
     if (d3.select("#model4HIII").property("checked")) {
          model4HIII.style("opacity", 1)
    }else{
          model4HIII.style("opacity", 0)
    }
  };  

var xAxisHIII = d3.svg.axis()
                  .scale(xScalelHIII)
                  .orient("bottom")
                  .ticks(20);

var yAxisHIII = d3.svg.axis()
                  .scale(yScalelHIII)
                  .orient("left")
                  .ticks(10);

  svgHIII.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+w/2+" ,0)")
    .call(yAxisHIII);

  svgHIII.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h-p)  + ")")
    .call(xAxisHIII);

  svgHIII.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w - 50)
    .attr("y", h - p - 5)
    .text("Time (hour)");

  svgHIII.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("x", 325)
    .attr("y", -10)
    .attr("dy", ".45em")
    .text("SBP (mmHg)");