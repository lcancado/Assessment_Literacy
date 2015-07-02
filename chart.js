
var margin = {top: 20, right: 20, bottom: 60, left: 60},
    width = 860 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var tipn = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white; font-size:10px'>" + d.name + "</span>";
  });

var svgRawBar = d3.select(".normGroupGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var gRawBar = svgRawBar.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

gRawBar.call(tipn);

var colors = d3.scale.category10();

gRawBar.append('g')
    .attr('class', 'x axis norm')
    .attr('transform', 'translate(0, '+ height +')');
  
gRawBar.append('g')
    .attr('class', 'y axis norm');


  function parseRow (d) {
    d.ID= d.ID;
    d.name= d.name;
    d.classID= d.classID;
    d.score= +d.score;
    d.pctRank= +d.pctRank;
    d.rank= +d.rank;

    return d;
  };


var loadData = function() {
  
  var group = document.getElementById('normgrp').selectedOptions[0].value;
  var index = document.getElementById('normgrp').selectedIndex;

  //window.alert("index:"+index)

  var dataFile = group + '.tsv';

  d3.tsv(dataFile, parseRow, function(data) {

    var ID = data.map(function(d) { return d.ID });
    var score = data.map(function(d) { return d.score });
    var pctRank = data.map(function(d) { return d.pctRank });
    var rank = data.map(function(d) { return d.rank });
    var name = data.map(function(d) { return d.name });

    var barWidth = Math.max(width / data.length,5);

    //window.alert(data.length);

    var  x = d3.scale.linear()
            .domain([0, 100])
            .range([0, width]);
    
    
    var  y = d3.scale.linear()
            .domain([0, 50])
            .range([height, 0]);

    var xNormAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');
    
    var yNormAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .tickFormat(d3.format('.0'));
    

    var rect = gRawBar.selectAll('.barRaw')
      .data(data);

    rect.enter().append('rect');

    rect.exit().remove();
    
    rect.attr('class', 'barRaw')
      .attr("x", function(d) { return x(d.pctRank); })
      .attr("width", barWidth - 1)
      .attr("y", function(d) { return y(d.score); })
      .attr("height", function(d) { return height - y(d.score); })
      .on('mouseover', tipn.show)
      .on('mouseout', tipn.hide)
      .attr("fill",function(d){
        if (d.name == 'Mary') { return 'purple'; }
        else {return colors(index);}  
      }) 
      ;
    

    d3.select('.x.axis.norm').call(xNormAxis);
    
    d3.select('.y.axis.norm').call(yNormAxis);
    
    /* d3.select('input').on('change', function() {
      var sortByScore = function(a, b) { return b.score - a.score; };
      
      var sortByRank = function(a, b) { return d3.ascending(a.pctRank, b.pctRank); };

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
    })
    */
  })
};

loadData()