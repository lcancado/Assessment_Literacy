
var marginCombo = {top: 10, right: 10, bottom: 10, left: 40},
    widthCombo = 860 - marginCombo.left - marginCombo.right,
    heightCombo = 280 - marginCombo.top - marginCombo.bottom;


var colors10 = d3.scale.category10().domain(d3.range(0,10));
var colors20 = d3.scale.category20().domain(d3.range(0,20));


var decision;
var scoreType;
var normGroup;

var critLnYCombo;
var critLnXCombo;

var xCombo = d3.scale.ordinal()
    .rangeRoundBands([0, widthCombo], 0.1);

var yCombo = d3.scale.linear()
    .range([heightCombo, 0]);   

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
   // .attr("preserveAspectRatio", "none")    
   // .attr("viewBox", "0 0 " + 860 + " " + 300)
    .attr("width", widthCombo + marginCombo.left + marginCombo.right)
    .attr("height", heightCombo + marginCombo.top + marginCombo.bottom)    
  .append("g")
    .attr("transform", "translate(" + marginCombo.left + "," + marginCombo.top + ")");


svgCombo.call(tip);

svgCombo.append("g")
    .attr("class", "x axis combo")
    .attr("transform", "translate(0," + heightCombo + ")")
  .append("text")
      .attr("class", "xaxiscombo axislabel")
      .attr("y", 35)
      .attr("x", widthCombo/2)
      .style("text-anchor", "middle")
      .text("Student Name");

svgCombo.append("g")
    .attr("class", "y axis combo")
  .append("text")
    .attr("class", "yaxiscombo axislabel")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - marginCombo.left)
    .attr("x", 0 - (heightCombo / 2))
    .attr("dy", "0.71em")
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
      .attr("height", function(d) { return heightCombo - yCombo(d.variable); })     
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("fill",function(d,i){
        if (d.name == 'Mary') { return 'purple'; } 
        else { return colors10(7);}  ;//grey                
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
        .attr("heightCombo", function(d) { return heightCombo - yCombo(d.variable); })
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
        .attr("height", function(d) { return heightCombo - yCombo(d.variable); })     
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


      clearXCritLine();

      tip.html(function(d) {
          return "<span style='color:white; font-size:12px'>" + d.variable + "</span>"; });

      svgCombo.call(tip);

      yAxisCombo.tickValues([1,10, 20, 30, 40, 50, 60, 70, 80, 90, 99]);
      xAxisCombo.tickValues(sortedNames);
      
      transitionCombo.select(".y.axis.combo") // change the y axis
        .call(yAxisCombo);
      
      transitionCombo.select(".yaxiscombo.axislabel")
         .text(yAxisLabel);

      transitionCombo.select(".x.axis.combo")
        .call(xAxisCombo);

      transitionCombo.select(".xaxiscombo.axislabel")
         .text(xAxisLabel);

      updateYCritLine(cutScoreComboY);


    
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
        .attr("heightCombo", function(d) { return heightCombo - yCombo(d.variable); })
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
        .attr("height", function(d) { return heightCombo - yCombo(d.variable); })     
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

      clearXCritLine();

      tip.html(function(d) {
          return "<span style='color:white; font-size:12px'>" + d.variable + "</span>"; });
      svgCombo.call(tip);


      yAxisCombo.tickValues([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
      xAxisCombo.tickValues(sortedNames);
      
      transitionCombo.select(".y.axis.combo") // change the y axis
        .call(yAxisCombo);
      
      transitionCombo.select(".yaxiscombo.axislabel")
         .text(yAxisLabel);

      transitionCombo.select(".x.axis.combo")
        .call(xAxisCombo);

      transitionCombo.select(".xaxiscombo.axislabel")
         .text(xAxisLabel);

      updateYCritLine(cutScoreComboY);

    
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
        .range([0, widthCombo]);

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
          .attr("heightCombo", function(d) { return heightCombo - yCombo(d.variable); })
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
          .attr("transform", "translate(0," + heightCombo + ")")
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
        .transition().duration(1000)
        .attr("x", function(d) { return xCombo(d.rankName); })
        .attr("width", xCombo.rangeBand())
        .attr("y", function(d) { return yCombo(d.variable); })
        .attr("height", function(d) { return heightCombo - yCombo(d.variable); })     
        //.on('mouseover', tip.show)
        //.on('mouseout', tip.hide)
        .attr("fill",function(d,i){
          if (d.name == 'Mary') { return 'purple'; } 
          else { 
            if ( (+d.variable < cutScoreComboY) || (+d.rank > cutScoreComboX) ) { return colors10(3); } //red
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

      xAxisCombo.tickValues(["1","10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]);
      
      transitionCombo.select(".y.axis.combo") // change the y axis
        .call(yAxisCombo);
      
      transitionCombo.select(".yaxiscombo.axislabel")
         .text(yAxisLabel);

      transitionCombo.select(".x.axis.combo")
        .call(xAxisCombo);

      transitionCombo.select(".xaxiscombo.axislabel")
         .text(xAxisLabel);

      updateYCritLine(cutScoreComboY);
      updateXCritLine(cutScoreComboX);
    
    });


  }
    
};

function checkCombo (myform) {

    decision=getRadioValue(myform.elements['decision']);
    scoreType=getRadioValue(myform.elements['scoreType']);
    normGroup=getRadioValue(myform.elements['normGroup']);

    $('html, body').animate({
    scrollTop: $("#Activity4").offset().top}, 500);

    checkDecision (decision, scoreType, normGroup );
    
};

function updateYCritLine(cutScoreInput) {

  var cutScoreY = +cutScoreInput;

  var transitionCombo = svgCombo.transition().duration(750);
  var delay = function(d, i) { return i * 50; };

  
   if (typeof critLnYCombo == "undefined") {

      critLnYCombo = svgCombo.append("line")
          .attr("class", "critLnYCombo")
          .attr("x1", 0)
          .attr("x2", widthCombo)
          .attr("y1", function(d) { return yCombo(cutScoreY); })
          .attr("y2", function(d) { return yCombo(cutScoreY); })
          .style("stroke", "rgb(0, 0, 0)")
          .style("stroke-widthCombo","1")
          .style("shape-rendering","crispEdges")
          .style("stroke-dasharray","10,10") ;

      svgCombo.append("g")
        .append("text")  
          .attr("class", "critLnYComboText")    
          .attr("y", yCombo(cutScoreY) - 10)
          .attr("x", 5)
          .attr("dy", ".35em")
          .style("text-anchor", "start")   
          .style("font", "12px sans-serif")         
          .text("Criterion") ;

    }

    transitionCombo.selectAll(".critLnYCombo")
      .delay(delay)
      .attr("y1", function(d) { return yCombo(cutScoreY); })
      .attr("y2", function(d) { return yCombo(cutScoreY); }) ;

    transitionCombo.selectAll(".critLnYComboText")
      .delay(delay)
      .attr("y", yCombo(cutScoreY) - 10) ;

};


function clearXCritLine() {

  var transitionCombo = svgCombo.transition().duration(750);
    
  transitionCombo.selectAll(".critLnXCombo")
      .style("stroke-opacity","0.0");
      
  transitionCombo.selectAll(".critLnXComboText")
      .text("") ;

};


function updateXCritLine(cutScoreInput) {

  var cutScoreX = +cutScoreInput;

  var transitionCombo = svgCombo.transition().duration(750);
  var delay = function(d, i) { return i * 50; };

   if (typeof critLnXCombo == "undefined") {

      critLnXCombo = svgCombo.append("line")
          .attr("class", "critLnXCombo")
          .attr("x1", function(d) { return xCombo(cutScoreX); })
          .attr("x2", function(d) { return xCombo(cutScoreX); })
          .attr("y1", 0)
          .attr("y2", heightCombo)
          .style("stroke", "rgb(0, 0, 0)")
          .style("stroke-widthCombo","1")
          .style("shape-rendering","crispEdges")
          .style("stroke-dasharray","10,10") ;

      svgCombo.append("g")
        .append("text")  
          .attr("class", "critLnXComboText")    
          .attr("y", -5)
          .attr("x", xCombo(cutScoreX) -10 )
          .attr("dy", ".35em")
          .style("text-anchor", "start")   
          .style("font", "12px sans-serif") ;
    }


    transitionCombo.selectAll(".critLnXCombo")
      .delay(delay)
      .style("stroke-opacity","1.0")
      .attr("x1", function(d) { return xCombo(cutScoreX); })
      .attr("x2", function(d) { return xCombo(cutScoreX); });

    transitionCombo.selectAll(".critLnXComboText")
      .delay(delay)
      .attr("x", xCombo(cutScoreX) -10 ) 
      .text("Top " +cutScoreX) ;

};


function clearComboRadios(myform) {

  //window.alert("combo clicked");

  var allRadios = myform.elements['scoreType'];

  //window.alert(allRadios.length);

  var i = 0;
    
  for (i = 0; i < allRadios.length; i++) {
      allRadios[i].checked = false;

      //window.alert(allRadios[i].name);
      //window.alert(allRadios[i].checked);
  }

  allRadios = myform.elements['normGroup']; 
    
  for (i = 0; i < allRadios.length; i++) {
      allRadios[i].checked = false;
  }

};