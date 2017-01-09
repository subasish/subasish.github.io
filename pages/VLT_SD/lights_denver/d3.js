var path = d3.geo.path();

var svg = d3.select('#container')
			.append('svg')
			.attr("width", "900px")
			.attr("height", "650px");

var projection = d3.geo.albersUsa()
                       .translate([19700, 4420])
                       .scale([174000]);

var path = d3.geo.path()
                 .projection(projection);

var colors = ["rgb(0,128,0)", "rgb(178,34,34)", "rgb(255,215,0)"];


d3.json("traffic_signals.json", function (json) {

    var points = svg.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)

       function repeat(){
           points.transition()
           .duration(1000)
           .style("opacity", .7)
           .attr("fill", 

           function changeColor(d) {

           	 	var index = Math.floor(Math.random() * 3);
	            var value = colors[index];

	            return value;
	        	
	            })

           .ease("sine");
   		}

   	setTimeout(repeat, 0);
   	setInterval(repeat, 5000);

});
  


