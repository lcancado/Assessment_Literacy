
var margin = {top: 20, right: 20, bottom: 60, left: 60},
    width = 860 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var colors10 = d3.scale.category10().domain(d3.range(0,10));
var colors20 = d3.scale.category20().domain(d3.range(0,20));

var cutScore=getCutScore();

var critLine;

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

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white; font-size:12px'>" + d.variable + "</span>";
  });

var svgCrit = d3.select(".criterionGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svgCrit.call(tip);


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
  //yCrit.domain([d3.min(data, function(d) { return d.variable; }), d3.max(data, function(d) { return d.variable; })]);

  svgCrit.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisCrit)
    .append("text")
      .attr("class", "xaxis_label")
      .attr("y", 45)
      .attr("x", width/2)
      .style("text-anchor", "middle")
      .text("Student Name");

  svgCrit.append("g")
      .attr("class", "y axis")
      .call(yAxisCrit)
    .append("text")
      .attr("class", "yaxis_label")
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
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("fill",function(d,i){
        if (d.name == 'Mary') { return 'purple'; } 
        else { 
          if (+d.variable < cutScore) { return colors10(3); } //red
          else {return colors10(0);} ;//blue  
        }        
      }) 
      //.attr("fill",function(d,i){return colors(i)} ) 
      ;

    
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


function getCutScore() { 

  var cutScores = document.getElementsByName('cutScore');
    
  for(var i = 0; i < cutScores.length; i++){
        if(cutScores[i].checked){
            return +cutScores[i].value;
        }
    }
};

function updateCriterion(myRadio) {

    cutScore = myRadio.value;


    if (typeof critLine == "undefined") {

      critLine = svgCrit.append("line")
          .attr("class", "critLine")
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

    transitionCrit.selectAll(".critLine")
      .delay(delay)
      .attr("y1", function(d) { return yCrit(cutScore); })
      .attr("y2", function(d) { return yCrit(cutScore); }) ;

    transitionCrit.selectAll(".critLineText")
      .delay(delay)
      .attr("y", yCrit(cutScore) - 10) ;
};

