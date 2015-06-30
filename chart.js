
  var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


  var svg = d3.select(".normGroupGraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.append('g')
     .attr('class', 'x axis')
     .attr('transform', 'translate(0, '+ height +')');
  
  g.append('g')
     .attr('class', 'y axis');


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

  var dataFile = group + '.tsv';

  d3.tsv(dataFile, parseRow, function(data) {

    var ID = data.map(function(d) { return d.ID });
    var score = data.map(function(d) { return d.score });
    var pctRank = data.map(function(d) { return d.pctRank });
    var rank = data.map(function(d) { return d.rank });
    var name = data.map(function(d) { return d.name });

    var barWidth = Math.max(width / data.length,5);

    //window.alert(data.length);

    var x = d3.scale.linear()
            .domain([0, d3.max(pctRank)])
            .range([0, width]);
    
    
    var y = d3.scale.linear()
            .domain([0, 50])
            .range([height, 0]);

     
    var rect = g.selectAll('.bar')
      .data(data);
    
    rect.enter().append('rect');

    rect.exit().remove();
    
    rect.attr('class', 'bar')
      .attr("x", function(d) { return x(d.pctRank); })
      .attr("width", barWidth - 1)
      .attr("y", function(d) { return y(d.score); })
      .attr("height", function(d) { return height - y(d.score); });


    
    var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient('bottom');
    
    var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient('left')
                  .tickFormat(d3.format('.0'));
    
    d3.select('.x.axis').call(xAxis);
    
    d3.select('.y.axis').call(yAxis);
    
    d3.select('input').on('change', function() {
      var sortByScore = function(a, b) { return b.score - a.score; };
      
      var sortByRank = function(a, b) { return d3.ascending(a.pctRank, b.pctRank); };

      var sortedRanks = data.sort(this.checked ? sortByRank : sortByScore)
                         .map(function(d) { return d.pctRank; })

      x.domain(sortedRanks)
      
      var transition = svg.transition().duration(750);
      
      var delay = function(d, i) { return i * 50; };
      
      transition.selectAll(".bar")
          .delay(delay)
          .attr("x", function(d) { return x(d.pctRank); });
      
      transition.select(".x.axis")
          .call(xAxis)
          .selectAll("g")
          .delay(delay);
    })
  })
};

loadData()