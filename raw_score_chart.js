
var margin = {top: 20, right: 20, bottom: 60, left: 60},
    width = 860 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var colors10 = d3.scale.category10().domain(d3.range(0,10));
var colors20 = d3.scale.category20().domain(d3.range(0,20));

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .range([height, 0]);   

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white; font-size:12px'>" + d.variable + "</span>";
  });

var svgRawChart = d3.select(".rawScoreGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svgRawChart.call(tip);


var tsv;

d3.tsv("classroom.tsv", function(error, data){

  if (error) throw error;

  tsv = data;

  tsv.sort(function (a,b) {return d3.ascending(a.name, b.name);});

  data.forEach(function(d){ 
      d.variable = +d.score;
      d.name= d.name;
  });

  x.domain(data.map(function(d) { return d.name; }));
  y.domain ([0,50]);
  //y.domain([d3.min(data, function(d) { return d.variable; }), d3.max(data, function(d) { return d.variable; })]);

  svgRawChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "xaxis_label")
      .attr("y", 45)
      .attr("dx", "30.71em")
      .style("text-anchor", "middle")
      .text("Student Name");

  svgRawChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "yaxis_label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "2em")
      .style("text-anchor", "middle")
      .text("Number Correct");
  
  var barRaw = svgRawChart.selectAll(".barRaw")
      .data(data)      
    .enter().append("rect")
      .attr("class", "barRaw")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.variable); })
      .attr("height", function(d) { return height - y(d.variable); })     
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("fill",function(d,i){
        if (d.name == 'Mary') { return 'purple'; }
        else {return colors10(0);}  
      }) 
      //.attr("fill",function(d,i){return colors10(i)} ) 
      ;


  // The following code doesn't work :-( )
  //bar.append("text")
  //    .text(function(d) { return d.variable; })
  //    .attr("text-anchor", "middle")
  //    .attr("x", x.rangeBand()/2 )
  //    .attr("y", 1)
  //    .attr("font-family", "sans-serif")
  //    .attr("font-size", "10px")
  //    .attr("fill", "white")   ;

 //  Sort funtion

  d3.select(".sortRaw").on("change", function() {
    
    var sortByScore = function(a, b) { return a.variable - b.variable; };
    var sortByName = function(a, b) { return d3.ascending(a.name, b.name); };
    var sortedNames = data.sort(this.checked ? sortByScore : sortByName)
                          .map(function(d) { return d.name; });

    x.domain(sortedNames);
      
    var transition = svgRawChart.transition().duration(750);
    var delay = function(d, i) { return i * 50; };
      
    transition.selectAll(".barRaw")
      .delay(delay)
      .attr("x", function(d) { return x(d.name); });
      
    transition.select(".x.axis")
      .call(xAxis)
      .selectAll("g")
      .delay(delay);

  /*    
    if (this.checked ) {

      var cutPercent = 90;

      var critLine = svgRawChart.append("line")
        .attr("class", "normLine")
        .attr("x1", function(d) { return x(cutPercent); })
        .attr("x2", function(d) { return x(cutPercent); })
        .attr("y1", 0)
        .attr("y2", height)
        .style("stroke", "rgb(0, 0, 0)")
        .style("stroke-width","1")
        .style("shape-rendering","crispEdges")
        .style("stroke-dasharray","10,10")      
        ;

      svgRawChart.append("g")
        .append("text")  
          .attr("class", "normLineText")    
          .attr("y", -10)
          .attr("x", x(cutPercent) + 5)
          .attr("dy", ".35em")
          .style("text-anchor", "middle")   
          .style("font", "12px sans-serif")         
          .text("Top 10%");
    } 
     else {
      if (typeof yourvar != 'undefined') { }
     }; 

    */

  });
    

});


//update data from combobox onChange
function updateData() {
  
  document.getElementById('sortRaw').checked = false;

  var value = document.getElementById('rawscore').selectedOptions[0].id;
  var scale = +document.getElementById('rawscore').selectedOptions[0].value;
  var scoreType = document.getElementById('rawscore').selectedOptions[0].text;
  var index = document.getElementById('rawscore').selectedIndex;

  var data = [];      
  tsv.forEach(function(d){ 
    data.push({variable: +d[value], name: d['name']});
  });

  data.sort(function (a,b) {return d3.ascending(a.name, b.name);});

  x.domain(data.map(function(d) { return d.name; }));

  y.domain ([0,scale]);
  //y.domain([d3.min(data, function(d) { return d.variable; }), d3.max(data, function(d) { return d.variable; })]);
  

  // Make the changes
  var transition = svgRawChart.transition().duration(1000),
      delay = function(d, i) { return i * 100; };
    
  svgRawChart.selectAll(".barRaw")
     .data(data)
     .transition().duration(1000)
     .attr("x", function(d) { return x(d.name); })
     .attr("y", function(d) { return y(d.variable); })
     .attr("height", function(d) { return height - y(d.variable); })
     //.attr("fill",function(d){return colors10(index)} ) 
     .attr("fill",function(d,i){
        if (d.name == 'Mary') { return 'purple'; }
        else {return colors10(index);}  
      })
  ;
    
    transition.select(".y.axis") // change the y axis
      .call(yAxis);

    transition.select(".yaxis_label")
       .text(scoreType);

    transition.select(".x.axis")
      .call(xAxis);
};
