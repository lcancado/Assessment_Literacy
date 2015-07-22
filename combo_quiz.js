
function checkDecision(decisionP, scoreP, groupP ) {

  if ( decisionP=='D1' ) {

    if (scoreP=='percentile' ) {

        if (groupP == 'classroom') {

            updateComboChart(decisionP);
            document.getElementById("comboResults").innerHTML = "";
            document.getElementById("comboReactiveText").innerHTML = "Mary <b>did not</b> score at the 80th percentile in her class, therefore she is <b>not</b> eligible to enroll in Calculus. Four students in her class had scores at or above 80% of the Math I scores in their class and are eligible to enroll in Calculus.";
        }
        else {
          document.getElementById("comboResults").innerHTML = "<font color=red><b>Double check the norm group</b></font>";
          document.getElementById("comboReactiveText").innerHTML = "";
        };
    }

    else {
        document.getElementById("comboResults").innerHTML = "<font color=red><b>Double check the score type</b></font>";
        document.getElementById("comboReactiveText").innerHTML = "";
    };


  }

  else if (decisionP=='D2') {

    if (scoreP=='numCorrect' ) {

      if (groupP == 'none') {

          updateComboChart(decisionP);
          document.getElementById("comboResults").innerHTML = "";
          document.getElementById("comboReactiveText").innerHTML = "Mary scored 45 points in the test, therefore she would <b>not</b> get a prize based on this criterion. Three students in her class scored 45 or more on the test and would get a Math prize.";
      }
      else {
        document.getElementById("comboResults").innerHTML = "<font color=red><b>Double check the norm group</b></font>";
        document.getElementById("comboReactiveText").innerHTML = "";
      };
    }

    else {
        document.getElementById("comboResults").innerHTML = "<font color=red><b>Double check the score type</b></font>";
        document.getElementById("comboReactiveText").innerHTML = "";
    };

  }

  else if (decisionP=='D3') {    

    if (scoreP=='rank' ) {

      if (groupP == 'school') {

          updateComboChart(decisionP);
          document.getElementById("comboResults").innerHTML = "";
          document.getElementById("comboReactiveText").innerHTML = "Mary scored 45 points in the test and ranked 9th in Math I at ABC Hight, therefore she <b>would</b> be able to enroll in Math II based on the selected criteria.";
      } 
      else {
        document.getElementById("comboResults").innerHTML = "<font color=red><b>Double check the norm group</b></font>";
        document.getElementById("comboReactiveText").innerHTML = "";
      };
    }

    else {
        document.getElementById("comboResults").innerHTML = "<font color=red><b>Double check the score type</b></font>";
        document.getElementById("comboReactiveText").innerHTML = "";
    };

  };

  //document.getElementById("comboResults").innerHTML = "<font color=blue><b>Correct! :-)</b></font> <br>Since we want to compare Mary's score to her 9th grade schoolmates in order to find out if she was among the top ranked students, the norm group is all ABC High's 9th grade students in the current school year.";		
  
  
};
//  End -->


