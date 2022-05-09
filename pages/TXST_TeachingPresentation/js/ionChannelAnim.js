(function () {
    //// Model parameters (data that does not change)
    var gna = 0.22,
    gk = 0.4,
    gl = 0.1,
    vna = 3.73,
    vk = -0.9,
    vl = -0.36,
    thNa1 = 1.57,
    thNa2 = -1.02,
    thK1 = -2.3,
    thK2 = 1.,
    betaNa = 1,
    betaK = 0.05,
    NNa = 300, NK = 200; // total number of channels
    //// data that changes
    // voltage, time and the number of open ion channels
    var v = -0.3, t = 0,
    nNa = 0, nK = 0;
    // applied current changes on mouse over
    // to store ion channel data (S=0 for closed and S=1 for on)
    var nodesNa = d3.range(NNa).map(randIC);
    var nodesK = d3.range(NK).map(randIC);
    function randIC(i) {
	    var r = 150*Math.sqrt(Math.random()),
		theta = 2*Math.PI*Math.random();
	    return {S:0,
		    x: 150 + r*Math.cos(theta),
		    y: 150 + r*Math.sin(theta)};
    }
    //////////////////////////////////////////////////
    ////////////// Event-based simulation ////////////
    //////////////////////////////////////////////////
    // Intended for visualization puposes only
    // THIS IS NOT A QUANTITATIVELY ACCURATE SIMULATION
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    function evolveSimulation() {
        var t0 = t;
        while (t-t0 < 0.7) { // evolves simulation forward until dt time has ellapsed
            flip();
        }
    }
    function flip() {
      // each time this is called, a single ion channel is either open or closed
        var u = Math.random(1),
        rNaClose = betaNa*nNa,
        rNaOpen = betaNa*alphaNa(v)*(NNa - nNa),
        rKClose = betaK*alphaK(v)*nK,
        rKOpen = betaK/alphaK(v)*(NK - nK);
        var rtot = rNaClose + rNaOpen + rKClose + rKOpen;
        if (u < rNaClose/rtot) { // Na channel close
            // this is not the correct way to sample the random time
            // the rates depend on voltage, which depends on time...
            dt = -Math.log(Math.random(1))/rNaClose;
            v = voltage(dt);
            t += dt;
            nodesNa[findOpenNa()].S = 0;
            nNa --;
        }
        else if (u < (rNaClose + rNaOpen)/rtot) { // Na channel open
            dt = -Math.log(Math.random(1))/rNaOpen;
            v = voltage(dt);
            t += dt;
            nodesNa[findClosedNa()].S = 1;
            nNa ++;
        }
        else if (u < (rNaClose + rNaOpen + rKClose)/rtot) { // K channel close
            dt = -Math.log(Math.random(1))/rKClose;
            v = voltage(dt);
            t += dt;
            nodesK[findOpenK()].S = 0;
            nK --;
        }
        else { // K channel open
            dt = -Math.log(Math.random(1))/rKOpen;
            v = voltage(dt);
            t += dt;
            nodesK[findClosedK()].S = 1;
            nK ++;
        }
    }
    function findOpenNa() {
        var j = 0, r = randint(1, nNa);
	for (var n=0; n<NNa; n++) {
	    if (nodesNa[n].S == 1) j++;
	    if (j == r) return n;
	}
    }
    function findClosedNa() {
        var j = 0, r = randint(1, NNa-nNa);
	for (var n=0; n<NNa; n++) {
	    if (nodesNa[n].S == 0) j++;
	    if (j == r) return n;
	}
    }
    function findOpenK() {
        var j = 0, r = randint(1, nK);
	for (var n=0; n<NK; n++) {
	    if (nodesK[n].S == 1) j++;
	    if (j == r) return n;
	}
    }
    function findClosedK() {
        var j = 0, r = randint(1, NK-nK);
	for (var n=0; n<NK; n++) {
	    if (nodesK[n].S == 0) j++;
	    if (j == r) return n;
	}
    }
    function voltage(dt) {
        var q1 = nNa/NNa*gna + nK/NK*gk + gl;
        var q2 = nNa/NNa*gna*vna + nK/NK*gk*vk + gl*vl + Iapp;
        return (v - q2/q1)*Math.exp(-q1*dt) + q2/q1;
    }
    function alphaNa(v) {return Math.exp(4*(thNa1*v + thNa2));}
    function alphaK(v) {return Math.exp(thK1*v + thK2);}
    function uniform(a, b) {return a + (b - a)*Math.random(1);}
    function randint(a, b) {return Math.round(uniform(a, b));}
    /////////////////////////
    //// animation setup ////
    /////////////////////////
    var ionChannelBoxWidth = 300,
    graphBoxSeparation = 10,
    graphWidth = 900 - ionChannelBoxWidth - graphBoxSeparation,
    graphHeight = 310,
    channelRadius = 5,
    cNa = "#FF4000", // orange
    cK = "#0080FF"; // blue
    //// svg
    var graphSvg = d3.select("#ionGraphAnimation")
        .append("svg")
        .attr("width", graphWidth)
        .attr("height", graphHeight),
    g = graphSvg.append("g"),
    ionChannelSvg = d3.select("#ionChannelAnimation")
        .append("svg")
        .attr("width", ionChannelBoxWidth)
        .attr("height", ionChannelBoxWidth);
    /////////////////////////////
    /////////// graph ///////////
    /////////////////////////////
    var wxgraph = g.append("g"), // channel fraction graph
	vgraph = g.append("g"), // voltage graph
	Npts = 500,
    data = d3.range(Npts).map(
        function (i) {return {v: -55, w: 0, x: 0};}
    );
    var vs = d3.scale.linear()
        .domain([-60, 30])
        .range([graphHeight/2, 5]),
    vline = d3.svg.line()
        .x((d, i) => i - Npts - 30)
        .y(d => vs(d.v)),
    ws = d3.scale.linear()
        .domain([0, 1])
        .range([graphHeight - 5, graphHeight/2 + 20]),
    wline = d3.svg.line()
        .x((d, i) => i - Npts - 30)
        .y(d => ws(d.w)),
    xs = d3.scale.linear()
        .domain([0, 1])
        .range([graphHeight - 5, graphHeight/2 + 20]),
    NaLine = d3.svg.line()
        .x((d, i) => i - Npts - 30)
        .y(d => xs(d.x)),
    //// axis for v
    vaxis = vgraph
        .attr("class", "yaxis")
        .attr("transform", "translate(" + (graphWidth-35) + ", 0)")
        .call(d3.svg.axis().scale(vs).orient("left"))//.tickValues([-55, 25])
        .append("text").attr("transform", "rotate(-90)")
        .attr("x", -graphHeight/4).attr("y", 20)
        .style("text-anchor", "middle")
        .text("voltage (mV)")
        .style("font-size", 16)
        .style("font-family", "sans-serif")
        .style("font-weight", 200),
    //// axis for w and x
    wxaxis = wxgraph
        .attr("class", "yaxis")
        .attr("transform", "translate(" + (graphWidth-35) + ", 0)")
        .call(d3.svg.axis().scale(xs).orient("left").tickValues([0, 0.5, 1]))
        .append("text").attr("transform", "rotate(-90)")
        .attr("x", -graphHeight*0.78).attr("y", 20)
        .style("text-anchor", "middle")
        .text("open fraction")
        .style("font-size", 16)
        .style("font-family", "sans-serif")
        .style("font-weight", 200),
    vPath = vgraph
        .append("path")
        .datum(data)
        .attr("class", "move line")
        .attr("d", vline);
    wPath = wxgraph
        .append("path")
        .datum(data)
        .attr("class", "move line")
        .attr("d", wline)
        .style("stroke", cK),
    NaPath = wxgraph
        .append("path")
        .datum(data)
        .attr("class", "move line")
        .attr("d", NaLine)
        .style("stroke", cNa);
    vDimensional = function (v) {return v*44 - 44;}
    function tick() {
        // Main function that graphs voltage and ion channel fractions
	NaPath.attr("d", NaLine);
        wPath.attr("d", wline);
        vPath.attr("d", vline);
        // get current values from simulation data
        data.push({v: vDimensional(v), w: nK/NK, x: nNa/NNa});
	data.shift();
        evolveSimulation(); // evolve monte carlo simulation forward in time
	NaChannels.style("fill-opacity", d => ((d.S == 0) ? 0: 1))
	KChannels.style("fill-opacity", d => ((d.S == 0) ? 0: 1))
	// NaChannels.style("fill", d => ((d.S == 0) ? "#000": cNa))
	// KChannels.style("fill", d => ((d.S == 0) ? "#000": cK))
        if (!IONisOn) {
	    force.stop();
	    return 1;
	}
    }
    /////////////////////////////
    ///////// channels //////////
    /////////////////////////////
    var ionChannelBox = ionChannelSvg.append("g");
    /////// background for channels animation
    ionChannelBox.append("rect")
        .attr("width", ionChannelBoxWidth)
        .attr("height", ionChannelBoxWidth)
        .style("fill", "none");
    var NaChannels = ionChannelBox.append("g")
        .selectAll("circle")
        .data(nodesNa).enter()
	.append("circle")
        .attr("r", channelRadius)
        .attr("cx", d => d.x) //channel locations
    	.attr("cy", d => d.y)
	.style("stroke", "#000")
	.style("stroke-width", 0.5)
        .style("fill", cNa);
    var KChannels = ionChannelBox.append("g")
        .selectAll("circle")
        .data(nodesK).enter()
	.append("circle")
        .attr("r", channelRadius)
        .attr("cx", d => d.x) //channel locations
    	.attr("cy", d => d.y)
	.style("stroke", "#000")
	.style("stroke-width", 0.5)
        .style("fill", cK);

    //////////////////////////////////
    ///////// force layout //////////
    //////////////////////////////////
    var force = d3.layout.force()
        .nodes(nodesNa.concat(nodesK))
        .gravity(.4).charge(-15)
        .friction(0.95)
        .size([ionChannelBoxWidth, ionChannelBoxWidth])
    	.start();
    force.on("tick",
    	     function () {
    		 nodesNa.forEach(reflectingBoundary);
		 nodesK.forEach(reflectingBoundary);
    		 NaChannels
		     .attr("cx", d => d.x) //channel locations
    		     .attr("cy", d => d.y);
		 KChannels
		     .attr("cx", d => d.x) //channel locations
    		     .attr("cy", d => d.y);

    		 }
    	    );
    function reflectingBoundary(node) {
        // reflecting boundaries to hold in the channels
        // also gives them a random push
        if (node.x > ionChannelBoxWidth) node.x = ionChannelBoxWidth;
	else if (node.x < 0) node.x = 0;
        if (node.y > ionChannelBoxWidth) node.y = ionChannelBoxWidth;
        else if (node.y < 0) node.y = 0;
    }
    //////////////////////////////////////////
    /////////////// interaction //////////////
    //////////////////////////////////////////
    var IONslideID = -1;
    window.addEventListener('IonSlide',
			    function (event) {IONisOn = true;
					      IONslideID = Reveal.getState().indexh;
					      // IONsubSlideID = Reveal.getState().indexv;
					      d3.timer(tick);
					     }
			   );
    window.addEventListener('slidechanged',
			    function (event) {if (event.indexh != IONslideID
						  // || event.indexv != IONsubSlideID
						 ) IONisOn = false;}
			   );
    ///// controls /////
    var IappSlider = document.querySelector("#IappSlider"),
    Iapp = IappSlider.value/100;
    document.getElementById("IappVal").innerHTML = Iapp.toPrecision(2);
    IappSlider.addEventListener("input",
				function () {
				    force.resume();
				    Iapp = IappSlider.value/100;
				    document.getElementById("IappVal").innerHTML = Iapp.toPrecision(2);
				}, false);
        // IappSlider.addEventListener("change",
	// 			    function () {
    	// 				force.resume();
	// 				d3.timer(delaystop, 1000);
	// 			}, false);
    function delaystop() {
	force.stop();
	return 1;
    }
})();


// x = new Array(100).fill(0.0);
// y = new Array.from(Array(100), () => Math.random());
// // add two vectors
// z = x.map((xn, n) => y[n] + xn);
