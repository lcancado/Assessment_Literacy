
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

svgCombo.append("g")
    .attr("class", "x axis combo")
    .attr("transform", "translate(0," + height + ")")
  .append("text")
      .attr("class", "xaxiscombo_label")
      .attr("y", 45)
      .attr("x", width/2)
      .style("text-anchor", "middle")
      .text("Student Name");

svgCombo.append("g")
    .attr("class", "y axis combo")
  .append("text")
    .attr("class", "yaxiscombo_label")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "2em")
    .style("text-anchor", "middle")
    .text("Number Correct");


var tsvCombo;

var dataFileCombo="classroom.tsv";

d3.tsv(dataFileCombo, function(error, data){

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

  
  var barCrit = svgCombo.selectAll(".barCombo")
      .data(data);

  barCrit.enter().append("rect");

  barCrit.exit().remove();

  barCrit.attr("class", "barCombo")
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

    d3.select('.x.axis.combo')
        .call(xAxisCombo)
      .selectAll("text")
        .style("text-anchor", "middle") ;
    

    d3.select('.y.axis.combo')
        .call(yAxisCombo) ;
    
    
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

      var yAxisLabel = "Percentile Rank";
      var xAxisLabel = "Student Name";
      cutScoreComboY = 80;

  /*
      var data = []; 
      tsvCombo.forEach(function(d){ 
        data.push({variable: +d['pctRank'], name: d['name'] }); 
      });

      var sortedNames = tsvCombo.sort(function (a,b) {return a.variable - b.variable; })
                                .map(function(d) { return d.name; });

      
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
            if (+d.variable < cutScoreComboY) { return colors10(3); } //red
            else {return colors10(0);} ;//blue  
            }
        })
      ;
    
      yAxisCombo.tickValues([1,10, 20, 30, 40, 50, 60, 70, 80, 90, 99]);
      
      transitionCombo.select(".y.axis") // change the y axis
        .call(yAxisCombo);
      
      transitionCombo.select(".yaxiscombo_label")
         .text(yAxisLabel);

      transitionCombo.select(".x.axis")
        .call(xAxisCombo);
      */

    dataFileCombo="classroom.tsv";

    d3.tsv(dataFileCombo, function(error, data){

        if (error) throw error;

        tsvCombo = data;

        data.forEach(function(d){ 
          d.variable = +d.pctRank;
          d.name= d.name;
        });

       var sortedNames = tsvCombo.sort(function (a,b) {return a.variable - b.variable; })
                                .map(function(d) { return d.name; });

      
      xCombo.domain(sortedNames);
      yCombo.domain ([0,99]);

  
      var barCrit = svgCombo.selectAll(".barCombo")
        .data(data);

      barCrit.enter().append("rect");

      barCrit.exit().remove();

      barCrit.attr("class", "barCombo")
        .transition().duration(1000)
        .attr("x", function(d) { return xCombo(d.name); })
        .attr("width", xCombo.rangeBand())
        .attr("y", function(d) { return yCombo(d.variable); })
        .attr("height", function(d) { return height - yCombo(d.variable); })     
        //.on('mouseover', tip.show)
        //.on('mouseout', tip.hide)
        .attr("fill",function(d,i){
          if (d.name == 'Mary') { return 'purple'; } 
          else { 
            if (+d.variable < cutScoreComboY) { return colors10(3); } //red
            else {return colors10(0);} ;//blue  
            }
        })
      ;

      tip.html(function(d) {
          return "<span style='color:white; font-size:12px'>" + d.variable + "</span>"; });

      svgCombo.call(tip);

      yAxisCombo.tickValues([1,10, 20, 30, 40, 50, 60, 70, 80, 90, 99]);
      
      transitionCombo.select(".y.axis.combo") // change the y axis
        .call(yAxisCombo);
      
      transitionCombo.select(".yaxiscombo_label")
         .text(yAxisLabel);

      transitionCombo.select(".x.axis.combo")
        .call(xAxisCombo);

      transitionCombo.select(".xaxiscombo_label")
         .text(xAxisLabel);

      updateCritLine(cutScoreComboY);
    
    });
  }

  else if (decisionType == 'D2') {

            
      var yAxisLabel = "Number Correct";
      var xAxisLabel = "Student Name";
      cutScoreComboY = 45;

/*
      var data = [];
      tsvCombo.forEach(function(d){ 
        data.push({variable: +d['score'], name: d['name']}); 
      });

      var sortedNames = tsvCombo.sort(function (a,b) {return a.variable - b.variable; })
                                .map(function(d) { return d.name; });
      
      xCombo.domain(sortedNames);
      yCombo.domain ([0,50]);

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
            if (+d.variable < cutScoreComboY) { return colors10(3); } //red
            else {return colors10(0);} ;//blue  
            }
        })
      ;
    
      transitionCombo.select(".y.axis") // change the y axis
        .call(yAxisCombo);
      
      transitionCombo.select(".yaxiscombo_label")
         .text(yAxisLabel);

      transitionCombo.select(".x.axis")
        .call(xAxisCombo);

  */

  dataFileCombo="classroom.tsv";

    d3.tsv(dataFileCombo, function(error, data){

        if (error) throw error;

        tsvCombo = data;

        data.forEach(function(d){ 
          d.variable = +d.score;
          d.name= d.name;
        });

       var sortedNames = tsvCombo.sort(function (a,b) {return a.variable - b.variable; })
                                .map(function(d) { return d.name; });

      
      xCombo.domain(sortedNames);
      yCombo.domain ([0,50]);

  
      var barCrit = svgCombo.selectAll(".barCombo")
        .data(data);

      barCrit.enter().append("rect");

      barCrit.exit().remove();

      barCrit.attr("class", "barCombo")
        .transition().duration(1000)
        .attr("x", function(d) { return xCombo(d.name); })
        .attr("width", xCombo.rangeBand())
        .attr("y", function(d) { return yCombo(d.variable); })
        .attr("height", function(d) { return height - yCombo(d.variable); })     
        //.on('mouseover', tip.show)
        //.on('mouseout', tip.hide)
        .attr("fill",function(d,i){
          if (d.name == 'Mary') { return 'purple'; } 
          else { 
            if (+d.variable < cutScoreComboY) { return colors10(3); } //red
            else {return colors10(0);} ;//blue  
            }
        })
      ;

      tip.html(function(d) {
          return "<span style='color:white; font-size:12px'>" + d.variable + "</span>"; });
      svgCombo.call(tip);


      yAxisCombo.tickValues([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
      
      transitionCombo.select(".y.axis.combo") // change the y axis
        .call(yAxisCombo);
      
      transitionCombo.select(".yaxiscombo_label")
         .text(yAxisLabel);

      transitionCombo.select(".x.axis.combo")
        .call(xAxisCombo);

      transitionCombo.select(".xaxiscombo_label")
         .text(xAxisLabel);

      updateCritLine(cutScoreComboY);
    
    });

  }

  else if (decisionType == 'D3') {

      
      var xAxisLabel = "Student Rank";
      var yAxisLabel = "Number Correct";

      
      cutScoreComboX = 20;
      cutScoreComboY = 35;
    /*
      var data = []; 
      tsvCombo.forEach(function(d){ 
        data.push({variable: +d['rank'], score: d['score'], name: d['name']}); 
      });


      var sortedScores = tsvCombo.sort(function (a,b) {return a.variable - b.variable; });

      xCombo = d3.scale.linear()
        .domain([0, 50])
        .range([0, width]);

      xAxisCombo = d3.svg.axis()
        .scale(xCombo)
        .orient("bottom")
        .tickValues([0, 10, 20, 30, 40, 50]);

           
      yCombo.domain ([0,20]);    
    
      svgCombo.selectAll(".barCombo")
          .data(data)
          .transition().duration(1000)
          .attr("x", function(d) { return xCombo(d.score); })
          .attr("y", function(d) { return yCombo(d.variable); })
          .attr("height", function(d) { return height - yCombo(d.variable); })
          .attr("fill",function(d,i){
            if (d.name == 'Mary') { return 'purple'; } 
            else { 
              if (+d.variable < cutScoreComboY) { return colors10(3); } //red
              else {return colors10(0);} ;//blue  
              }
          }) ;

        tip.html(function(d) {
          return "<span style='color:white; font-size:12px'>" + d.name + "</span>"; });

        
        transitionCombo.select(".y.axis") // change the y axis
          .call(yAxisCombo);
      
        transitionCombo.select(".yaxiscombo_label")
           .text(yAxisLabel);

        transitionCombo.select(".x.axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxisCombo);

        transitionCombo.select(".xaxiscombo_label")
         .text(xAxisLabel);
      */
  dataFileCombo="school.tsv";

    d3.tsv(dataFileCombo, function(error, data){

      if (error) throw error;

        tsvCombo = data;

        data.forEach(function(d){ 
          d.variable = +d.score;
          d.rank = +d.rank;
          d.rankName = d.rank;
          d.name= d.name;
        });

      var sortedNames = tsvCombo.sort(function (a,b) {return a.variable - b.variable; })
                                .map(function(d) { return d.name; });

      var rankNames = tsvCombo.map(function(d) { return d.rankName; });

      
      
      xCombo.domain(rankNames);
      yCombo.domain ([0,50]);

  
      var barCrit = svgCombo.selectAll(".barCombo")
        .data(data);

      barCrit.enter().append("rect");

      barCrit.exit().remove();

      barCrit.attr("class", "barCombo")
        .attr("x", function(d) { return xCombo(d.rankName); })
        .attr("width", xCombo.rangeBand())
        .attr("y", function(d) { return yCombo(d.variable); })
        .attr("height", function(d) { return height - yCombo(d.variable); })     
        //.on('mouseover', tip.show)
        //.on('mouseout', tip.hide)
        .attr("fill",function(d,i){
          if (d.name == 'Mary') { return 'purple'; } 
          else { 
            if (+d.variable < cutScoreComboY) { return colors10(3); } //red
            else {return colors10(0);} ;//blue  
            }
        })
      ;


      tip.html(function(d) {
          return "<span style='color:white; font-size:12px'>" + d.name + "</span>"; });
      svgCombo.call(tip);

      barCrit
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

      yAxisCombo.tickValues([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);

      //xAxisCombo.tickValues(rankNames);
      
      transitionCombo.select(".y.axis.combo") // change the y axis
        .call(yAxisCombo);
      
      transitionCombo.select(".yaxiscombo_label")
         .text(yAxisLabel);

      transitionCombo.select(".x.axis.combo")
        .call(xAxisCombo);

      transitionCombo.select(".xaxiscombo_label")
         .text(xAxisLabel);

      updateCritLine(cutScoreComboY);
    
    });


  }
    
};

function checkCombo (myform) {

    decision=getRadioValue(myform.elements['decision']);
    scoreType=getRadioValue(myform.elements['scoreType']);
    normGroup=getRadioValue(myform.elements['normGroup']);

    checkDecision (decision, scoreType, normGroup );
    
};

function updateCritLine(cutScoreInput) {

  var cutScoreY = +cutScoreInput;

  var transitionCombo = svgCombo.transition().duration(750);
  var delay = function(d, i) { return i * 50; };

   if (typeof critLnCombo == "undefined") {

      critLnCombo = svgCombo.append("line")
          .attr("class", "critLnCombo")
          .attr("x1", 0)
          .attr("x2", width)
          .attr("y1", function(d) { return yCombo(cutScoreY); })
          .attr("y2", function(d) { return yCombo(cutScoreY); })
          .style("stroke", "rgb(0, 0, 0)")
          .style("stroke-width","1")
          .style("shape-rendering","crispEdges")
          .style("stroke-dasharray","10,10") ;

      svgCombo.append("g")
        .append("text")  
          .attr("class", "critLnComboText")    
          .attr("y", yCombo(cutScoreY) - 10)
          .attr("x", 5)
          .attr("dy", ".35em")
          .style("text-anchor", "start")   
          .style("font", "12px sans-serif")         
          .text("Criterion") ;

    }

    transitionCombo.selectAll(".critLnCombo")
      .delay(delay)
      .attr("y1", function(d) { return yCombo(cutScoreY); })
      .attr("y2", function(d) { return yCombo(cutScoreY); }) ;

    transitionCombo.selectAll(".critLnComboText")
      .delay(delay)
      .attr("y", yCombo(cutScoreY) - 10) ;

}