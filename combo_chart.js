
var margin = {top: 20, right: 20, bottom: 60, left: 60},
    width = 860 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var colors10 = d3.scale.category10().domain(d3.range(0,10));
var colors20 = d3.scale.category20().domain(d3.range(0,20));

var decision;
var scoreType;
var normGroup;

var critLnCombo;

var xCombo = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var yCombo = d3.scale.linear()
    .range([height, 0]);   

var xAxisCombo = d3.svg.axis()
    .scale(xCombo)
    .orient("bottom");

var yAxisCombo = d3.svg.axis()
    .scale(yCombo)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white; font-size:12px'>" + d.variable + "</span>";
  });

var svgCombo = d3.select(".comboGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svgCombo.call(tip);


var tsvCombo;

d3.tsv("classroom.tsv", function(error, data){

  if (error) throw error;

  tsvCombo = data;

  tsvCombo.sort(function (a,b) {return d3.ascending(a.name, b.name);});

  data.forEach(function(d){ 
      d.variable = +d.score;
      d.name= d.name;
  });

  xCombo.domain(data.map(function(d) { return d.name; }));
  yCombo.domain ([0,50]);
  //yCombo.domain([d3.min(data, function(d) { return d.variable; }), d3.max(data, function(d) { return d.variable; })]);

  svgCombo.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisCombo)
    .append("text")
      .attr("class", "xaxiscombo_label")
      .attr("y", 45)
      .attr("x", width/2)
      .style("text-anchor", "middle")
      .text("Student Name");

  svgCombo.append("g")
      .attr("class", "y axis")
      .call(yAxisCombo)
    .append("text")
      .attr("class", "yaxiscombo_label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "2em")
      .style("text-anchor", "middle")
      .text("Number Correct");
  
  var barCrit = svgCombo.selectAll(".barCombo")
      .data(data)      
    .enter().append("rect")
      .attr("class", "barCombo")
      .attr("x", function(d) { return xCombo(d.name); })
      .attr("width", xCombo.rangeBand())
      .attr("y", function(d) { return yCombo(d.variable); })
      .attr("height", function(d) { return height - yCombo(d.variable); })     
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

/*
  critLnCombo = svgCombo.append("line")
      .attr("class", "critLnCombo")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", function(d) { return y(cutScore); })
      .attr("y2", function(d) { return y(cutScore); })
      .style("stroke", "rgb(0, 0, 0)")
      .style("stroke-width","1")
      .style("shape-rendering","crispEdges")
      .style("stroke-dasharray","10,10")      
      ;

  svgCombo.append("g")
    .append("text")  
      .attr("class", "critLineText")    
      .attr("y", y(cutScore) - 10)
      .attr("x", 5)
      .attr("dy", ".35em")
      .style("text-anchor", "start")   
      .style("font", "12px sans-serif")         
      .text("Cut Score");
  */
    
    
});


function getRadioValue(myRadio) { 
  
  for(var i = 0; i < myRadio.length; i++){

    if(myRadio[i].checked){
        return myRadio[i].value;        
    }
  }
};


function updateComboChart(decisionType) {

  var transitionCombo = svgCombo.transition().duration(750);
  var delay = function(d, i) { return i * 50; };
  
  if (decisionType == 'D1') {

      var data = [];      
      var scoreCombo = "Percentile Rank";

      tsvCombo.forEach(function(d){ 
        data.push({variable: +d['pctRank'], name: d['name'], score: d['score']}); 
      });

      var sortedNames = tsvCombo.sort(function (a,b) {return a.variable - b.variable; })
                                .map(function(d) { return d.name; });

      cutScoreCombo = 80;

      xCombo.domain(sortedNames);
      yCombo.domain ([0,99]);

      // Make the changes
    
      svgCombo.selectAll(".barCombo")
        .data(data)
        .transition().duration(1000)
        .attr("x", function(d) { return xCombo(d.name); })
        .attr("y", function(d) { return yCombo(d.variable); })
        .attr("height", function(d) { return height - yCombo(d.variable); })
        .attr("fill",function(d,i){
          if (d.name == 'Mary') { return 'purple'; } 
          else { 
            if (+d.variable < cutScoreCombo) { return colors10(3); } //red
            else {return colors10(0);} ;//blue  
            }
        })
      ;
    
      yAxisCombo.tickValues([1,10, 20, 30, 40, 50, 60, 70, 80, 90, 99]);
      
      transitionCombo.select(".y.axis") // change the y axis
        .call(yAxisCombo);
      
      
    
      transitionCombo.select(".yaxiscombo_label")
         .text(scoreCombo);

      transitionCombo.select(".x.axis")
        .call(xAxisCombo);
  }

    if (typeof critLnCombo == "undefined") {

      critLnCombo = svgCombo.append("line")
          .attr("class", "critLnCombo")
          .attr("x1", 0)
          .attr("x2", width)
          .attr("y1", function(d) { return yCombo(cutScoreCombo); })
          .attr("y2", function(d) { return yCombo(cutScoreCombo); })
          .style("stroke", "rgb(0, 0, 0)")
          .style("stroke-width","1")
          .style("shape-rendering","crispEdges")
          .style("stroke-dasharray","10,10") ;

      svgCombo.append("g")
        .append("text")  
          .attr("class", "critLnComboText")    
          .attr("y", yCombo(cutScoreCombo) - 10)
          .attr("x", 5)
          .attr("dy", ".35em")
          .style("text-anchor", "start")   
          .style("font", "12px sans-serif")         
          .text("Criterion") ;

    }

    /*  
    transitionCombo.selectAll(".barCombo")
      .delay(delay)
      .attr("fill",function(d,i){        
        if (d.name == 'Mary') { return 'purple'; } 
        else { 
          if (+d.variable < cutScoreCombo) { return colors10(3); } //red
          else {return colors10(0);} ;//blue  
        }
      });

    */

    transitionCombo.selectAll(".critLnCombo")
      .delay(delay)
      .attr("y1", function(d) { return yCombo(cutScoreCombo); })
      .attr("y2", function(d) { return yCombo(cutScoreCombo); }) ;

    transitionCombo.selectAll(".critLnComboText")
      .delay(delay)
      .attr("y", yCombo(cutScoreCombo) - 10) ;

    
};

function checkCombo (myform) {

      decision=getRadioValue(myform.elements['decision']);
      scoreType=getRadioValue(myform.elements['scoreType']);
      normGroup=getRadioValue(myform.elements['normGroup']);

      checkDecision (decision, scoreType, normGroup );

     
};