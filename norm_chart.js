/*
Developed by Luciana Cancado as an internship project at the Center for Assessment (http://www.nciea.org/) during Summer 2015.

This script:
  - creates a bar chart that pulls from different datasets depending on a combobox selection.
  - adds a line element to indicate a predefined cut point on the x axis.
  - adds a tooltip using D3-tip (source: https://github.com/caged/d3-tip, example: http://bl.ocks.org/Caged/6476579)
  
For a detailed example on how to create a bar chart and explanation of the various elements of this script, check:
http://bost.ocks.org/mike/bar/
*/

var margin = {top: 20, right: 20, bottom: 10, left: 60},
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var colors10 = d3.scale.category10().domain(d3.range(0,10));
var colors20 = d3.scale.category20().domain(d3.range(0,20));

/* Initialize tooltip */
var tipn = d3.tip()
  .attr('class', 'd3-tip')
  .parent(document.getElementById('normGroupGraph'))
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white; font-size:10px'>" + d.name + "</span>";
  });

var svgNormChart = d3.select(".normGroupGraph").append("svg")
    .attr("preserveAspectRatio", "none")    
    .attr("viewBox", "0 0 " + 920 + " " + 440)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var gNormChart = svgNormChart.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var xNorm = d3.scale.linear()
      .domain([0, 99])
      .range([0, width]);

       
var yNorm = d3.scale.linear()
      .domain([0, 100])
      .range([height, 0]);

var xNormAxis = d3.svg.axis()
      .scale(xNorm)
      .orient('bottom')
      .tickValues([1,10, 20, 30, 40, 50, 60, 70, 80, 90, 99]);
    
var yNormAxis = d3.svg.axis()
      .scale(yNorm)
      .orient('left')
      .tickFormat(d3.format('.0'));  

gNormChart.call(tipn); // Invoke the tip in the context of your visualization 

gNormChart.append('g')
    .attr('class', 'x axis norm')
    .attr('transform', 'translate(0, '+ height +')')
  .append("text")
    .attr("class", "xaxisnorm axislabel")
    .attr("y", 45)
    .attr("x", width/2)
    .style("text-anchor", "middle")
    .text("Percentile Rank")   ;
  
gNormChart.append('g')
    .attr('class', 'y axis norm')
  .append("text")
    .attr("class", "yaxisnorm axislabel")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "2em")
    .style("text-anchor", "middle")
    .text("Percent Correct");


var cutPercentile = 90;

var critLine = gNormChart.append("line")
      .attr("class", "normLine")
      .attr("x1", function(d) { return xNorm(cutPercentile); })
      .attr("x2", function(d) { return xNorm(cutPercentile); })
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "rgb(0, 0, 0)")
      .style("stroke-width","1")
      .style("shape-rendering","crispEdges")
      .style("stroke-dasharray","10,10")      
      ;

gNormChart.append("g")
    .append("text")  
      .attr("class", "normLineText")    
      .attr("y", -10)
      .attr("x", xNorm(cutPercentile) + 5)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")   
      .style("font", "12px sans-serif")         
      .text("90th Percentile");

function parseRow (d) {

  d.ID= d.ID;
  d.name= d.name;
  d.classID= d.classID;
  d.score= +d.score;
  d.pctRank= +d.pctRank;
  d.rank= +d.rank;
  d.pctCorrect = +d.pctCorrect;

  return d;
};


var loadData = function() {

  
  var group = document.getElementById('normgrp').selectedOptions[0].value;
  var index = document.getElementById('normgrp').selectedIndex;

  var dataFile = group + '.tsv';

  d3.tsv(dataFile, parseRow, function(data) {

    var ID = data.map(function(d) { return d.ID });
    var score = data.map(function(d) { return d.score });
    var pctRank = data.map(function(d) { return d.pctRank });
    var rank = data.map(function(d) { return d.rank });
    var name = data.map(function(d) { return d.name });
    var pctCorrect = data.map(function(d) { return d.pctCorrect });

    var barWidth = Math.max( (width / data.length)- 7, 7) ;
 
    var rect = gNormChart.selectAll('.barNorm')
      .data(data);

    rect.enter().append('rect');

    rect.exit().remove();
    
    rect.attr('class', 'barNorm')      
      .attr("x", function(d) { return xNorm(d.pctRank); })
      .attr("width", barWidth - 2)
      .attr("y", function(d) { return yNorm(d.pctCorrect); })
      .attr("height", function(d) { return height - yNorm(d.pctCorrect); })
      /* Show and hide tip on mouse events */
      .on('mouseover', tipn.show)
      .on('mouseout', tipn.hide)
      .attr("fill",function(d){
        if (d.name == 'Mary') { return 'purple'; }
        else {return colors10(0);}  
      }) 
      ;
    
    d3.select('.x.axis.norm')
        .call(xNormAxis)
      .selectAll("text")
        .style("text-anchor", "middle")
    ;
    

    d3.select('.y.axis.norm')
        .call(yNormAxis)
    ;  

  }) // end of d3.tsv

}; // end of loadData function

loadData();