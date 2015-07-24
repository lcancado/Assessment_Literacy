/*
Developed by Luciana Cancado as an internship project at the Center for Assessment (http://www.nciea.org/) during Summer 2015.

This script:
  - creates a bar chart for number correct and percent correct using the classroom.tsv fictitious dataset. 
  - updates chart contents depending on the variable selected. 
  - sorts data 
  - adds a tooltip using D3-tip (source: https://github.com/caged/d3-tip, example: http://bl.ocks.org/Caged/6476579)

For a detailed example on how to create a bar chart and explanation of the various elements of this script, check:
http://bost.ocks.org/mike/bar/
*/


var margin = {top: 20, right: 20, bottom: 10, left: 60},
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var colors10 = d3.scale.category10().domain(d3.range(0,10));
var colors20 = d3.scale.category20().domain(d3.range(0,20));

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .range([height, 0]);   

var xAxisRaw = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxisRaw = d3.svg.axis()
    .scale(y)
    .orient("left");

/* Initialize tooltip */
var tip = d3.tip()
  .attr('class', 'd3-tip')
   .parent(document.getElementById('rawScoreGraph'))
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white; font-size:12px'>" + d.variable + "</span>";
  });

var svgRawChart = d3.select(".rawScoreGraph").append("svg")
    .attr("preserveAspectRatio", "none")    
    .attr("viewBox", "0 0 " + 920 + " " + 440)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svgRawChart.call(tip); /* Invoke the tip in the context of your visualization */

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
  
  svgRawChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisRaw)
    .append("text")
      .attr("class", "xaxisraw axislabel")
      .attr("y", 45)
      .attr("x", width/2)
      .style("text-anchor", "middle")
      .text("Student Name");

  svgRawChart.append("g")
      .attr("class", "y axis")
      .call(yAxisRaw)
    .append("text")
      .attr("class", "yaxisraw axislabel")
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
      /* Show and hide tip on mouse events */  
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("fill",function(d,i){
        if (d.name == 'Mary') { return 'purple'; }
        else {return colors10(0);}  
      }) ;


  //  Sort function triggerend by the onchange method of the checkbox with class=sortRaw
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
      .call(xAxisRaw)
      .selectAll("g")
      .delay(delay);
 
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
    
  transition.select(".y.axis") // update the y axis
    .call(yAxisRaw);

  transition.select(".yaxisraw.axislabel") // update the y axis label
     .text(scoreType);

  transition.select(".x.axis") // change the x axis
    .call(xAxisRaw);
};
