var w = 600,
h = 460,
p = 20;

var xScalelH4 = d3.scale.linear()
.domain([0, 24])
.range([0, w]);

var yScalelH4 = d3.scale.linear()
.domain([80, 200])
.range([h - 50, 0]);

var svgH4 = d3.select("#graph4")
.append('svg')
.attr("width", (w + 2 * p ))
.attr("height", h + 2 * p)
.attr("class", "graph")
.append("g")
.attr("transform", "translate(" + 3 + "," + p + ")");

var svg2H4 = d3.select("#graph4")
.append('svg')
.attr("width", 300)
.attr("height", 500)
.append("g")
.attr("transform", "translate(30, " + p + ")")
.on("mousemove", mousemove);

svg2H4.append('foreignObject')
.attr('x', - 10)
.attr('y', 10)
.attr('width', 230)
.attr('height', 200)
.append("xhtml:graph5")
.html('<div style="font-size: 14px; text-align: justify"><p><b>*Mouse-over the below chart to change the dose*.</b></p><p>The dose-MESOR relationship is described by a model with drug-effect saturating in the high dose range. The maximum reduction in mean SBP level is set to 20%, and half of this maximum effect is reached with a 2 mg dose.</p></div>');


svg2H4.append("rect")
.attr("transform", "translate(" + - p + "," + (230 - p) + ")")
.attr("width", 300)
.attr("height", 250)
.style("fill", "transparent");

svgH4.append("rect")
.attr("class", "highline")
.attr("transform", "translate(0, 375)")
.attr("width", w)
.attr("height", 35);

svgH4.append("rect")
.attr("class", "veryhighline")
.attr("transform", "translate(0, 0)")
.attr("width", w)
.attr("height", 205);

svgH4.append("rect")
.attr("class", "night")
.attr("transform", "translate(0, 0)")
.attr("width", 7 * w / 24)
.attr("height", h - 50);

svgH4.append("rect")
.attr("class", "night")
.attr("transform", "translate(" + 23 * w / 24 + ", 0)")
.attr("width", w / 24)
.attr("height", h - 50);

for (var j = 0; j <= h - 50; j = j + (410 / 12)) {
    // xlines
    svgH4.append("line")
    .attr("x1", 0)
    .attr("y1", j)
    .attr("x2", w)
    .attr("y2", j)
    .style("stroke", "#000000")
    .style("opacity", 0.1)
    .style("stroke-width", 1);
};

for (var j = 0; j <= w; j = j + (600 / 24)) {
    // ylines
    svgH4.append("line")
    .attr("x1", j)
    .attr("y1", 0)
    .attr("x2", j)
    .attr("y2", h - 50)
    .style("stroke", "#000000")
    .style("opacity", 0.1)
    .style("stroke-width", 1);
};

var configH4 = {
    "Amplitude 1": 14,
    "Phase shift 1": 14,
    "Amplitude 2": 7,
    "Phase shift 2": 9,
    "Amplitude 3": 3,
    "Phase shift 3": 2,
    "jy": ""
};

var domain = _.range(0, 24, 0.01);

var graphH4 = function(f) {
    var all;
    all = _.map(domain, function(x) {
        return {
            x: x,
            y: f(x)
        };
    });
    return all.filter(function (x) {
        return x.y < 200;
    })
};

var MESOR = 145;

var funcsH4 = {
    modelH4 : function(x) {
        return (MESOR + configH4["Amplitude 1"] * Math.cos((1 * 2 * Math.PI / 24) * (x - configH4["Phase shift 1"])) +
        configH4["Amplitude 2"] * Math.cos((2 * 2 * Math.PI / 24) * (x - configH4["Phase shift 2"])) +
        configH4["Amplitude 3"] * Math.cos((3 * 2 * Math.PI / 24) * (x - configH4["Phase shift 3"])));
    }
}

var svgLineH4 = d3.svg.line()
.x(function(d) {
    return xScalelH4(d.x);
}) 
.y(function(d) {
    return yScalelH4(d.y);
});

var modelH4 = svgH4.append("g")
.data([graphH4(funcsH4.modelH4)])
.append("path")
.attr("class", "modelH4")
.attr("fill", "none")
.style("stroke", "#000000")
.style("opacity", 1)
.attr("d", svgLineH4);

var redrawLines = function() {
    svgH4.selectAll(".modelH4").data([graphH4(funcsH4.modelH4)]).transition().duration(20).attr("d", svgLineH4);
};

var xAxisH4 = d3.svg.axis()
.scale(xScalelH4)
.orient("bottom")
.ticks(20);

var yAxisH4 = d3.svg.axis()
.scale(yScalelH4)
.orient("left")
.ticks(10);

svgH4.append("g")
.attr("class", "axis")
.attr("transform", "translate(" + w / 2 + " ,0)")
.call(yAxisH4);

svgH4.append("g")
.attr("class", "axis")
.attr("transform", "translate(0," + (h - p) + ")")
.call(xAxisH4);

svgH4.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", w - 50)
.attr("y", h - p - 5)
.text("Time (hour)");

svgH4.append("text")
.attr("class", "y label")
.attr("text-anchor", "middle")
.attr("x", 325)
.attr("y", - 10)
.attr("dy", ".45em")
.text("SBP (mmHg)");

var dataDose = d3.range(0, 10, 0.1).map(function(x) {
    return [x, 145 * (1 - (0.2 * Math.pow(x, 2) / (Math.pow(2, 2) + Math.pow(x, 2))))];
});

var xScaled = d3.scale.linear()
.domain([0, 10])
.range([0, 200]);

var yScaled = d3.scale.linear()
.domain([110, 150])
.range([430, 240]);

var xAxisd = d3.svg.axis()
.scale(xScaled)
.orient("bottom")
.ticks(4);

var yAxisd = d3.svg.axis()
.scale(yScaled)
.orient("left")
.ticks(10);

var svgLineDose = d3.svg.line()
.x(function(d) {
    return xScaled(d[0]);
}) 
.y(function(d) {
    return yScaled(d[1]);
});


var lineDose = svg2H4.append("g")
.datum(dataDose)
.append("path")
.attr("class", "line")
.attr("d", svgLineDose);

var circleDose = svg2H4.append("circle")
.attr("cx", 0)
.attr("cy", 0)
.attr("r", 0);

var xGuideline = svg2H4.append("line")
.attr("x1", 0)
.attr("x2", 0)
.attr("y1", 0)
.attr("y2", 0)
.attr("stroke", "#000000");

var yGuideline = svg2H4.append("line")
.attr("x1", 0)
.attr("x2", 0)
.attr("y1", 0)
.attr("y2", 0)
.attr("stroke", "#000000");

function mousemove() {
    var mouse = d3.mouse(this);
    var mx = mouse[0];
    var my = mouse[1];

    var index = Math.round(10 * (xScaled.invert(mx)));
    var d = dataDose[index];

    var lx = xScaled(d[0]);
    var ly = yScaled(d[1]);

    var jy = d[1];

    MESOR = jy;

    svgH4.selectAll(".modelH4").data([graphH4(funcsH4.modelH4)]).transition().duration(20).attr("d", svgLineH4);

    circleDose
    .attr("cx", lx)
    .attr("cy", ly)
    .attr("r", 3)
    .attr("fill", "#000000")
    .attr("opacity", 1)
    xGuideline.attr("x1", lx)
    .attr("x2", lx)
    .attr("y1", ly)
    .attr("y2", 440)
    .attr("opacity", 1)
    yGuideline.attr("x1", 0)
    .attr("x2", lx)
    .attr("y1", ly)
    .attr("y2", ly)
    .attr("opacity", 1)
};

svg2H4.append("g")
.attr("class", "axis")
.attr("transform", "translate(0, 440)")
.call(xAxisd);

svg2H4.append("g")
.attr("class", "axis")
.attr("transform", "translate(0 ,0)")
.call(yAxisd);

/*  svg2H4.append('foreignObject')
      .attr('x', 50)
      .attr('y', 280)
      .attr('width', 150)
      .attr('height', 20)
      .append("xhtml:graph5")
      .html('<div style="font-size: 12px; font-weight: bold">Dose-MESOR relationship</div>');*/

svg2H4.append('foreignObject')
.attr('x', - 20)
.attr('y', 220)
.attr('width', 100)
.attr('height', 20)
.append("xhtml:graph5")
.html('<div style="font-size: 12px; font-weight: bold">MESOR (mmHg)</div>');

svg2H4.append('foreignObject')
.attr('x', 170)
.attr('y', 420)
.attr('width', 100)
.attr('height', 20)
.append("xhtml:graph5")
.html('<div style="font-size: 12px; font-weight: bold">Dose (mg)</div>');

var svg3H4 = d3.select("#graph4")
.append('svg')
.attr("width", 600)
.attr("height", 250)
.append("g")
.attr("transform", "translate(30, 0)")
.on("mousemove", mousemove);

svg3H4.append('foreignObject')
.attr('x', - 5)
.attr('y', 10)
.attr('width', 550)
.attr('height', 200)
.append("xhtml:graph5")
.html('<div style="font-size: 14px; text-align: justify"><p><b>*Adjust, switch-off, play with the model parameters using the control panel*</b></p><p></br></br></br>Another interesting feature of this interactive graphic is the control offered on the amplitude parameters. When an amplitude parameter is set to 0, it cancels out the corresponding cosine function. Various published work <a href="http://www.ncbi.nlm.nih.gov/pubmed/9871427" id="Pop4" rel="popover" title="Reference:" target=" blank">[4]</a> <a href="http://www.page-meeting.org/page/page2006/P2006III_01.pdf" id="Pop5" rel="popover" title="Reference:" target=" blank">[5]</a> indicate that 2 or 3 harmonics are required to optimally describe BP data, but numerous studies just rely on 1 harmonic describing the sleep/wake shift.<p></div>');



dat.GUI.autoPlace = false;

var gui1 = new dat.GUI();

gui1.domElement.style.position = "relative";
gui1.domElement.style.left = "-50px";
//gui1.domElement.style.top = "-485px";
gui1.domElement.style.height = "250px";

document.getElementById("graph4").appendChild(gui1.domElement);

gui1.add(configH4, "Amplitude 1", 0, 30).onChange(redrawLines);
gui1.add(configH4, "Phase shift 1", 0, 20).onChange(redrawLines);
gui1.add(configH4, "Amplitude 2", 0, 15).onChange(redrawLines);
gui1.add(configH4, "Phase shift 2", 0, 10).onChange(redrawLines);
gui1.add(configH4, "Amplitude 3", 0, 5).onChange(redrawLines);
gui1.add(configH4, "Phase shift 3", 0, 5).onChange(redrawLines);

