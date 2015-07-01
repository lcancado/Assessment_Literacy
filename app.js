window.addEvent('domready', setUpCritNormTangle);

var totScore = 50;
var numCorrectMary = 45;
var pctCorrectMary;

function setUpCritNormTangle () { 
  
  var element = document.getElementById("CritNormModule");
  var tangle = new Tangle(element, {
    initialize: function () {
      this.numCorrect = 25;
      this.numCorrectMary = numCorrectMary;

    },
    
    update: function () {
      this.pctCorrect = this.numCorrect/totScore * 100;
      this.pctCorrectMary = this.numCorrectMary/totScore * 100;
      pctCorrectMary = +this.pctCorrectMary;
    }
  });
}

function outputUpdate(val) {
  document.querySelector('#pctCorrectMaryInput').value = val;
}

function checkPct(form) {
  pctAnswer= +form.pctCorrect.value;    
  if (pctAnswer == pctCorrectMary) {
      document.getElementById("pctCorrectResult").innerHTML = "<font color=blue><b>Correct!</b></font><p>Mary scored " +numCorrectMary +" points or " +pctCorrectMary+ "% on the exam. This is Mary's <b>raw score</b> as it is based exclusively on the <u>number of correctly answered items</u> on the test.</p>"; 
  } 
  else {
      document.getElementById("pctCorrectResult").innerHTML = "<font color=red><b>Not quite right, try again!</b></font>";        
  }
}