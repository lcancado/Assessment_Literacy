
function checkDecision(decisionP, scoreP, groupP ) {

  if ( decisionP=='D1' ) {

    if (scoreP=='percentile' ) {

        if (groupP == 'classroom') {

            updateComboChart(decisionP);
        }
        else {
          document.getElementById("comboResults").innerHTML = "Double check the norm group";
        };
    }

    else {
        document.getElementById("comboResults").innerHTML = "Double check the score type";
    };


  }

  else if (decisionP=='D2') {

      document.getElementById("comboResults").innerHTML = decisionP;

  }

  else if (decisionP=='D3') {

      document.getElementById("comboResults").innerHTML = decisionP;

  };

  //document.getElementById("comboResults").innerHTML = "<font color=blue><b>Correct! :-)</b></font> <br>Since we want to compare Mary's score to her 9th grade schoolmates in order to find out if she was among the top ranked students, the norm group is all ABC High's 9th grade students in the current school year.";		
  
  
};
//  End -->


