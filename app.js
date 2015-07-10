/* GLOBAL VARIABLES */

//Colors 

var colors10 = d3.scale.category10().domain(d3.range(0,10));
var colors20 = d3.scale.category20().domain(d3.range(0,20));

var totScore = 50;
var numCorrectMary = 45;
var pctCorrectMary;

//End Global Variables


window.addEvent('domready', setUpCritNormTangle);

function setUpCritNormTangle () { 
  
  var element = document.getElementById("CritNormModule");

  var tangle = new Tangle(element, {
    initialize: function () {
      this.numCorrect = 25;
      this.numCorrectMary = numCorrectMary;

    },
    
    update: function () {
      this.pctCorrectExample = this.numCorrect/totScore * 100;
      this.pctCorrectMary = this.numCorrectMary/totScore * 100;
      pctCorrectMary = +this.pctCorrectMary;
    }
  });
}

function outputUpdate(val) {
  document.querySelector('#pctCorrectMaryInput').value = val;
}

function checkPct(form) {
  pctAnswer= +form.pctCorrectMary.value;    
  if (pctAnswer == pctCorrectMary) {
      document.getElementById("pctCorrectResult").innerHTML = "<font color=blue><b>Correct!</b></font><p>Mary scored " +numCorrectMary +" points (raw score) or " +pctCorrectMary+ "% correct (scaled score) on the test.</p>"; 
      drawBulletCharts();
  } 
  else {
      document.getElementById("pctCorrectResult").innerHTML = "<font color=red><b>Not quite right, try again!</b></font>";        
  }
}