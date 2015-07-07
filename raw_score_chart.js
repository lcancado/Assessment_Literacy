
var margin = {top: 20, right: 20, bottom: 60, left: 60},
    width = 860 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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

var svgRaw = d3.select(".rawScoreGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svgRaw.call(tip);

//create line of values
var valueline = d3.svg.line()
  .x(function(d) { return x(d.name); })
  .y(function(d) { return y(d.variable); });

var tsv;

d3.tsv("classroom.tsv", function(error, data){

  if (error) throw error;

  tsv = data;

  data.forEach(function(d){ 
      d.variable = +d.score;
      d.name= d.name;
  });

  x.domain(data.map(function(d) { return d.name; }));
  y.domain ([0,50]);
  //y.domain([d3.min(data, function(d) { return d.variable; }), d3.max(data, function(d) { return d.variable; })]);

  svgRaw.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "xaxis_label")
      .attr("y", 45)
      .attr("dx", "30.71em")
      .style("text-anchor", "middle")
      .text("Student Name");

  svgRaw.append("g")
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
  
  var barRaw = svgRaw.selectAll(".bar")
      .data(data)      
    .enter().append("rect")
      .attr("class", "bar")
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

  /* Sort funtion
  d3.select('input').on('change', function() {
    
    var sortByScore = function(a, b) { return b.score - a.score; };
    var sortByID = function(a, b) { return d3.ascending(a.pctRank, b.pctRank); };
    var sortedRanks = data.sort(this.checked ? sortByRank : sortByScore)
                          .map(function(d) { return d.pctRank; })

    x.domain(sortedRanks)
      
    var transition = svgRawBar.transition().duration(750);
    var delay = function(d, i) { return i * 50; };
      
    transition.selectAll(".barRaw")
      .delay(delay)
      .attr("x", function(d) { return x(d.pctRank); });
      
    transition.select(".x.axis")
      .call(xAxis)
      .selectAll("g")
      .delay(delay);
    });
    */

});


//update data from combobox onChange
function updateData() {
  
  var value = document.getElementById('rawscore').selectedOptions[0].id;

  var scale = +document.getElementById('rawscore').selectedOptions[0].value;

  var scoreType = document.getElementById('rawscore').selectedOptions[0].text;

  var index = document.getElementById('rawscore').selectedIndex;

  //window.alert(index);

  var data = [];      
  tsv.forEach(function(d){ 
    data.push({variable: +d[value], name: d['name']});
  });

  x.domain(data.map(function(d) { return d.name; }));

  y.domain ([0,scale]);
  //y.domain([d3.min(data, function(d) { return d.variable; }), d3.max(data, function(d) { return d.variable; })]);
  

    // Select the section we want to apply our changes to
  var trans = d3.select(".rawScoreChart").transition();
    
    // Make the changes
  var transition = svgRaw.transition().duration(1000),
      delay = function(d, i) { return i * 100; };
    
  svgRaw.selectAll(".bar")
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
};
