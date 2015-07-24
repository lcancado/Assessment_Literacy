/*
Developed by Luciana Cancado as an internship project at the Center for Assessment (http://www.nciea.org/) during Summer 2015.

This script creates the bullet charts for number correct and percent correct for a given score. 
Currently the scores are hard-coded but one could change it to pass score values as parameters.
The bullet charts are created using the NVD3 library - http://nvd3.org/
I modified to original charts because my case did not need a mean - a different example of the uses of this type of
D3 chart can be found at http://nvd3-community.github.io/nvd3/examples/site.html
*/


function drawBulletCharts() {

    var width = 900,
        height = 80,
        margin = {top: 5, right: 40, bottom: 20, left: 120};
    
    var chartNumCorrect = nv.models.bulletChart()
        .width(width - margin.right - margin.left)
        .height(height - margin.top - margin.bottom);

    var chartPctCorrect = nv.models.bulletChart()
        .width(width - margin.right - margin.left)
        .height(height - margin.top - margin.bottom);
    
    
    dataNumCorrect = [
        {   "title":"Number Correct",   //Label the bullet chart
            "subtitle":"Points",        //sub-label for bullet chart
            "ranges":[0,50],            //Minimum and maximum values, you can add a mean also
            "measures":[40],            //Value representing current measurement (the thick purple line)
            "markers":[40],             //Place a marker on the chart (the white triangle marker)
            "markerLabels":['Mary'],    //Text for the popup label that is displayed when you hover over the triangle marker
            "rangeLabels":['Total Points','Minimum Points'], //Text for the popup label that is displayed when you hover over the grey region, my chart has onlyone region so only one text is displayed
            "measureLabels":['Points']  //Text for the popup labe that is displayed when you hover over the thick purple line
        }];

    dataPctCorrect = [
        {   "title":"Percent Correct",
            "subtitle":"%",
            "ranges":[0,100],
            "measures":[80],
            "markers":[80],
            "markerLabels":['Mary'],
            "rangeLabels":['Total %','Minimum %'],
            "measureLabels":['%'] 
        }     
    ];
    
    var visNumCorrect = d3.select("#chartNumCorrect").selectAll("svg") // select an svg element under #chartNumCorrect to be created
        .attr("preserveAspectRatio", "none")        //svg element rescale without preserving aspect ratio
        .attr("viewBox", "0 0 " + 920 + " " + 100)   
        .data(dataNumCorrect)           // attach array dataNumCorrect to the element 
        .enter().append("svg")          // create the svg element 
        .attr("class", "bullet nvd3")   // set its class name
        .attr("width", width)           
        .attr("height", height);

    visNumCorrect.transition().duration(1000).call(chartNumCorrect); 

   
    var visPctCorrect = d3.select("#chartPctCorrect").selectAll("svg")
        .attr("preserveAspectRatio", "none")    
        .attr("viewBox", "0 0 " + 920 + " " + 100)
        .data(dataPctCorrect)
        .enter().append("svg")
        .attr("class", "bullet nvd3")
        .attr("width", width)
        .attr("height", height);

    visPctCorrect.transition().duration(1000).call(chartPctCorrect);
   
    d3.selectAll(".nv-measure") //change default bullet chart collor to purple
      .style("fill", "purple");

};


