/*
Developed by Luciana Cancado as an internship project at the Center for Assessment (http://www.nciea.org/) during Summer 2015.

This script:
  - sets the tangle element used for the percent example
  - uses the Tangle.js and TangleKit.js libraries
*/

var totScore = 50;
var numCorrectMary = 40;
var pctCorrectMary;

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