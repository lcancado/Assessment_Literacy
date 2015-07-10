
function drawBulletCharts() {

    var width = 960,
        height = 80,
        margin = {top: 5, right: 40, bottom: 20, left: 120};
    
    var chartNumCorrect = nv.models.bulletChart()
        .width(width - margin.right - margin.left)
        .height(height - margin.top - margin.bottom);

    var chartPctCorrect = nv.models.bulletChart()
        .width(width - margin.right - margin.left)
        .height(height - margin.top - margin.bottom);
    
    
    dataNumCorrect = [
        {   "title":"Number Correct",
            "subtitle":"Points",
            "ranges":[0,50],
            "measures":[45],
            "markers":[45],
            "markerLabels":['Mary'],
            "rangeLabels":['Total Points','Minimum Points'],
            "measureLabels":['Points'] 
        }];
    dataPctCorrect = [
        {   "title":"Percent Correct",
            "subtitle":"%",
            "ranges":[0,100],
            "measures":[90],
            "markers":[90],
            "markerLabels":['Mary'],
            "rangeLabels":['Total %','Minimum %'],
            "measureLabels":['%'] 
        }     
    ];
    
    var visNumCorrect = d3.select("#chartNumCorrect").selectAll("svg")
        .data(dataNumCorrect)
        .enter().append("svg")
        .attr("class", "bullet nvd3")
        .attr("width", width)
        .attr("height", height);

    visNumCorrect.transition().duration(2000).call(chartNumCorrect);

    var visPctCorrect = d3.select("#chartPctCorrect").selectAll("svg")
        .data(dataPctCorrect)
        .enter().append("svg")
        .attr("class", "bullet nvd3")
        .attr("width", width)
        .attr("height", height);

    visPctCorrect.transition().duration(2000).call(chartPctCorrect);
   
};

