
var diameter = 600,
    dheight = 300,
    format = d3.format(",d");

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select(".bubbleGraph").append("svg")
    .attr("width", diameter)
    .attr("height", dheight)
    .attr("class", "bubble");

d3.json("classroom.json", function(error, root) {
  if (error) throw error;

  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + (d.y-50) + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d,i) {
        if (format(d.value) < 30) { return colors10(3); } //red
        else {return colors10(0);} //blue
      });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-size", function(d) { return Math.min((d.r-6)/2, ((d.r-6)/2)/ this.getComputedTextLength() )+ "px"; })
      .text(function(d) { return d.className.substring(0, d.r / 3)+" "+ format(d.value); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.score});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", dheight + "px");