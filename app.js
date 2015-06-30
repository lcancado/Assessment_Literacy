window.addEvent('domready', setUpCritNormTangle);

var totScore = 50;
var rawScoreMary=25;

function setUpCritNormTangle () { 
  
  var element = document.getElementById("CritNormModule");
  var tangle = new Tangle(element, {
    initialize: function () {
      this.numCorrect = 25;
      this.numCorrectMary = 40;

    },
    
    update: function () {
      this.pctCorrect = this.numCorrect/totScore * 100;
      this.pctCorrectMary = this.numCorrectMary/totScore * 100;
    }
  });
}

function outputUpdate(val) {
  document.querySelector('#pctCorrectMaryInput').value = val;
}
