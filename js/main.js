
$(document).ready(function(){

	setSizes();
	revealers();
	chartist();


	$('.about .reader').perfectScrollbar();


});

$(window).resize(function(){
	setSizes();
});

function setSizes(){
	var c_height = $(window).height()-50;
	$('.content').height(c_height);

	var block_height = $('.content').height() / 2;
	var ifr_height = block_height+30;

	
	$('.content-block').height(block_height);
	$('.chart-wrap').height(block_height);
	$('iframe.carto-db').css('height',ifr_height);

}


function revealers(){
	$(document).on('click','.chart-reveal',function(){
		var $c = $('.charts');

		if($c.hasClass('chart-open')) {
			$c.removeClass('chart-open');
		} else {
			$c.addClass('chart-open');
		}
	});

	$(document).on('click','.about-reveal',function(){
		var $a = $('.about');

		if($a.hasClass('about-open')) {
			$a.removeClass('about-open');
		} else {
			$a.addClass('about-open');
		}
	});

	$(document).on('click','.about-unreveal',function(){
		var $a = $('.about');
		$a.removeClass('about-open');
	});


	$(document).on('click','.legend-reveal',function(){
		var $l = $('.legend');

		if($l.hasClass('legend-open')) {
			$l.removeClass('legend-open');
			setTimeout(function(){
				$l.hide()
				},300);
		} else {
			$l.addClass('legend-open');
			$l.css('display','block')
		}
	});

	$(document).on('click','.legend-unreveal',function(){
		var $l = $('.legend');
		$l.removeClass('legend-open');
		setTimeout(function(){
				$l.hide()
				},300);
	});
}




function chartist(){
	var margin = {top:20,right:50,bottom:50,left:100},
		width  = ( $(window).width() * .75 ) - margin.left - margin.right,
		height = ( $('.content').height() / 2 ) - margin.top - margin.bottom;

	var x = d3.scale.linear().range([0,width]);
	var y = d3.scale.linear().range([height,0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
		
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var color = d3.scale.category10();	
		
		
	var line = d3.svg.line()
		.interpolate("basis")
		.x(function(d) { return x(d.hour); })
		.y(function(d) { return y(d.returns); });

	var h_chart = d3.select("#harvard-chart svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var k_chart = d3.select("#kendall-chart svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	d3.csv("./data/harvard_web2.csv", function(error, data) {
		color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Hour"; }));
		
		data.forEach(function(d) {
		    d.hour = parseInt(d.Hour);
		  });
	  
	  var breakouts = color.domain().map(function(name) {
	    return {
	      name: name,
	      values: data.map(function(d) {
	        return {hour: d.hour, returns: +d[name] };
	      }
	      )
	    };
	  });

	  console.log(breakouts);
	  
	  
	  
	  var all = breakouts;
	  var total = breakouts.slice(0,1);

	  console.log(total);
	  
	  var a = {width:width, height:height};
	    
	  x.domain(d3.extent(data, function(d) { return d.hour; } ));
	  
	  y.domain([
	    d3.min(breakouts, function(c) { return d3.min(c.values, function(v) { return v.returns; }); }),
	    d3.max(breakouts, function(c) { return d3.max(c.values, function(v) { return v.returns; }); })+200
	  ]);
	    
	    
	    h_chart.append("g")
	    		.attr("class", "x axis")
	    		.attr("transform", "translate(0," + height + ")")
	    		.call(xAxis)
	    	  .append("text")
	    	  .attr("x",width)
	    	  .attr("y",40)
	    	  .style("text-anchor","end")
	    	  .text("Hour of Day");
	    		
	    h_chart.append("g")
	    		.attr("class", "y axis")
	    		.call(yAxis)
	    	 .append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", ".71em")
			  .style("text-anchor", "end")
			  .text("Hubway Returns to Harvard");
			  
		var lines = h_chart.selectAll(".line")
			.data(all)
			.enter().append("g")
			.attr("class","line");
		
		lines.append("path")
			.attr("class", "path")
			.attr("class", function(d) {return "path "+d.name})
			.attr("d",0)
			.attr("d", function(d) { return line(d.values); } )
			.transition()
			.style("opacity",1);

	});

	d3.csv("./data/kendall_web.csv", function(error, data) {
		color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Hour"; }));
		
		data.forEach(function(d) {
		    d.hour = parseInt(d.Hour);
		  });
	  
	  var breakouts = color.domain().map(function(name) {
	    return {
	      name: name,
	      values: data.map(function(d) {
	        return {hour: d.hour, returns: +d[name] };
	      }
	      )
	    };
	  });

	  console.log(breakouts);
	  
	  
	  
	  var all = breakouts;
	  var total = breakouts.slice(0,1);

	  console.log(total);
	  
	  var a = {width:width, height:height};
	    
	  x.domain(d3.extent(data, function(d) { return d.hour; } ));
	  
	  y.domain([
	    d3.min(breakouts, function(c) { return d3.min(c.values, function(v) { return v.returns; }); }),
	    d3.max(breakouts, function(c) { return d3.max(c.values, function(v) { return v.returns; }); })
	  ]);
	    
	    
	    k_chart.append("g")
	    		.attr("class", "x axis")
	    		.attr("transform", "translate(0," + height + ")")
	    		.call(xAxis)
	    	  .append("text")
	    	  .attr("x",width)
	    	  .attr("y",40)
	    	  .style("text-anchor","end")
	    	  .text("Hour of Day");
	    		
	    k_chart.append("g")
	    		.attr("class", "y axis")
	    		.call(yAxis)
	    	 .append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", ".71em")
			  .style("text-anchor", "end")
			  .text("Hubway Returns to Kendall");
			  
		var lines = k_chart.selectAll(".line")
			.data(all)
			.enter().append("g")
			.attr("class","line");
		
		lines.append("path")
			.attr("class", "path")
			.attr("class", function(d) {return "path "+d.name})
			.attr("d",0)
			.attr("d", function(d) { return line(d.values); } )
			.transition()
			.style("opacity",1);

	});


}



