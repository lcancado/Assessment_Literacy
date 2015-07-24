/*
Developed by Luciana Cancado as an internship project at the Center for Assessment (http://www.nciea.org/) during Summer 2015.

This script:
  - creates a bar chart using the classroom.tsv dataset
  - changes the color of the bars depending on a given value of a dataset variable
  - adds a line element to indicate a predefined cut point on the y axis when a radio button is selected
  - sorts the chart  
  - adds a tooltip using D3-tip (source: https://github.com/caged/d3-tip, example: http://bl.ocks.org/Caged/6476579)
  
For a detailed example on how to create a bar chart and explanation of the various elements of this script, check:
http://bost.ocks.org/mike/bar/
*/

var margin = {top: 20, right: 20, bottom: 10, left: 60},
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var colors10 = d3.scale.category10().domain(d3.range(0,10));
var colors20 = d3.scale.category20().domain(d3.range(0,20));

var cutScore=getCutScore();

var critLineCrit;

var xCrit = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var yCrit = d3.scale.linear()
    .range([height, 0]);   

var xAxisCrit = d3.svg.axis()
    .scale(xCrit)
    .orient("bottom");

var yAxisCrit = d3.svg.axis()
    .scale(yCrit)
    .orient("left");

/* Initialize tooltip */
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .parent(document.getElementById('criterionGraph'))
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white; font-size:12px'>" + d.variable + "</span>";
  });

var svgCrit = d3.select(".criterionGraph").append("svg")
    .attr("preserveAspectRatio", "none")    
    .attr("viewBox", "0 0 " + 920 + " " + 440)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svgCrit.call(tip); // Invoke the tip in the context of your visualization

var tsvCrit;

d3.tsv("classroom.tsv", function(error, data){

  if (error) throw error;

  tsvCrit = data;

  tsvCrit.sort(function (a,b) {return d3.ascending(a.name, b.name);});

  data.forEach(function(d){ 
      d.variable = +d.score;
      d.name= d.name;
  });

  xCrit.domain(data.map(function(d) { return d.name; }));
  yCrit.domain ([0,50]);
  
  svgCrit.append("g")
      .attr("class", "xCrit axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisCrit)
    .append("text")
      .attr("class", "xaxiscrit axislabel")
      .attr("y", 45)
      .attr("x", width/2)
      .style("text-anchor", "middle")
      .text("Student Name");

  svgCrit.append("g")
      .attr("class", "yCrit axis")
      .call(yAxisCrit)
    .append("text")
      .attr("class", "yaxiscrit axislabel")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "2em")
      .style("text-anchor", "middle")
      .text("Number Correct");
  
  var barCrit = svgCrit.selectAll(".barCrit")
      .data(data)      
    .enter().append("rect")
      .attr("class", "barCrit")
      .attr("x", function(d) { return xCrit(d.name); })
      .attr("width", xCrit.rangeBand())
      .attr("y", function(d) { return yCrit(d.variable); })
      .attr("height", function(d) { return height - yCrit(d.variable); })     
      /* Show and hide tip on mouse events */
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      /* set bar colors depending on the value of the d.variable */
      .attr("fill",function(d,i){ 
        if (d.name == 'Mary') { return 'purple'; } 
        else { 
          if (+d.variable < cutScore) { return colors10(3); } //red
          else {return colors10(0);} ;//blue  
        }        
      }) ;
    
    d3.select(".sortCrit").on("change", function() {
    
      var sortByScore = function(a, b) { return a.variable - b.variable; };
      var sortByName = function(a, b) { return d3.ascending(a.name, b.name); };

      var sortedNames = data.sort(this.checked ? sortByScore : sortByName)
                          .map(function(d) { return d.name; });
      
      xCrit.domain(sortedNames);
          
      var transitionCrit = svgCrit.transition().duration(750);
      var delay = function(d, i) { return i * 50; };
      
      transitionCrit.selectAll(".barCrit")
        .delay(delay)
        .attr("x", function(d) { return xCrit(d.name); });
      
      transitionCrit.select(".xCrit.axis")
        .call(xAxisCrit)
        .selectAll("g")
        .delay(delay);
    });

});


// function to get the value of the selected cutScore radio 
function getCutScore() { 

  var cutScores = document.getElementsByName('cutScore');
    
  for(var i = 0; i < cutScores.length; i++){
        if(cutScores[i].checked){
            return +cutScores[i].value;
        }
    }
};


// function to update the chart depending on the cutscore radio button selected
function updateCriterion(myRadio) {

    cutScore = myRadio.value;

    /* jQuery to scroll to a given element id*/
    $('html, body').animate({
    scrollTop: $("#Activity3").offset().top}, 500);

    if (typeof critLineCrit == "undefined") {

      critLineCrit = svgCrit.append("line")
          .attr("class", "critLineCrit")
          .attr("x1", 0)
          .attr("x2", width)
          .attr("y1", function(d) { return yCrit(cutScore); })
          .attr("y2", function(d) { return yCrit(cutScore); })
          .style("stroke", "rgb(0, 0, 0)")
          .style("stroke-width","1")
          .style("shape-rendering","crispEdges")
          .style("stroke-dasharray","10,10") ;

      svgCrit.append("g")
        .append("text")  
          .attr("class", "critLineText")    
          .attr("y", yCrit(cutScore) - 10)
          .attr("x", 5)
          .attr("dy", ".35em")
          .style("text-anchor", "start")   
          .style("font", "12px sans-serif")         
          .text("Cut Score") ;

    }

    var transitionCrit = svgCrit.transition().duration(750);
    var delay = function(d, i) { return i * 50; };
      
    transitionCrit.selectAll(".barCrit")
      .delay(delay)
      .attr("fill",function(d,i){        
        if (d.name == 'Mary') { return 'purple'; } 
        else { 
          if (+d.variable < cutScore) { return colors10(3); } //red
          else {return colors10(0);} ;//blue  
        }
      });

    transitionCrit.selectAll(".critLineCrit")
      .delay(delay)
      .attr("y1", function(d) { return yCrit(cutScore); })
      .attr("y2", function(d) { return yCrit(cutScore); }) ;

    transitionCrit.selectAll(".critLineText")
      .delay(delay)
      .attr("y", yCrit(cutScore) - 10) ;
};

