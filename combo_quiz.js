/*
Developed by Luciana Cancado as an internship project at the Center for Assessment (http://www.nciea.org/) during Summer 2015.

This script:
  - parses the decisionP, scoreP, groupP parameters
  - displays an error when the incorrect scoreP and groupP options are selected depending on the decisionP
  - calls the updateComboChart function in combo_chart.js to update the graph when all the correct options are selected
  - populates the comboReactiveText with correct answer and explanation of the decision/question
*/

function checkDecision(decisionP, scoreP, groupP ) {

  if ( decisionP=='D1' ) {

    if (scoreP=='percentile' ) {

        if (groupP == 'classroom') {

            updateComboChart(decisionP);
            document.getElementById("comboResults").innerHTML = "";
            document.getElementById("comboReactiveText").innerHTML = 
            "Mary <b>did not</b> score at the 80th percentile in her class, therefore she is <b>not</b> eligible to enroll in Calculus. "+ 
            "Four students in her class had scores at or above 80% of the Math I scores in their class and are eligible to enroll in Calculus. "+
            "Since you had to compare Mary's performance in the test to her classmates', you made a norm-referenced interpretation of the test results.";
        }
        else {
          document.getElementById("comboResults").innerHTML = "<b><font color=red>Double check the norm group</font></b>";
          document.getElementById("comboReactiveText").innerHTML = "";
        };
    }

    else {
        document.getElementById("comboResults").innerHTML = "<b><font color=red>Double check the score type</font></b>";
        document.getElementById("comboReactiveText").innerHTML = "";
    };

  } // end if decisionP==D1

  else if (decisionP=='D2') {

    if (scoreP=='numCorrect' ) {

      if (groupP == 'none') {

          updateComboChart(decisionP);
          document.getElementById("comboResults").innerHTML = "";
          document.getElementById("comboReactiveText").innerHTML = 
          "Mary scored 40 points in the test, since she scored below the cut-score of 45 she would <b>not</b> get a prize based on this criterion. "+
          "Since you had to compare Mary's score against a predefined cut-score, you made a criterion-referenced interpretation of the test results and therefore no norm group was needed."
          ;
      }
      else {
        document.getElementById("comboResults").innerHTML = "<b><font color=red>Double check the norm group</font></b>";
        document.getElementById("comboReactiveText").innerHTML = "";
      };
    }

    else {
        document.getElementById("comboResults").innerHTML = "<b><font color=red>Double check the score type</font></b>";
        document.getElementById("comboReactiveText").innerHTML = "";
    };

  } // end else if decisionP==D2

  else if (decisionP=='D3') {    

    if (scoreP=='rank' ) {

      if (groupP == 'school') {

          updateComboChart(decisionP);
          document.getElementById("comboResults").innerHTML = "";
          document.getElementById("comboReactiveText").innerHTML = 
          "Mary scored 45 points in the test and ranked 9th in Math I at ABC Hight, therefore she <b>would</b> be able to enroll in Math II based on the selected criteria. "+
          "Since you had to both compare Mary's performance in the test to her classmates' by using her rank and compare her score against a predefined cut-score, you made a combined norm- and criterion-referenced interpretation of the test results."
          ;
      } 
      else {
        document.getElementById("comboResults").innerHTML = "<b><font color=red>Double check the norm group</font></b>";
        document.getElementById("comboReactiveText").innerHTML = "";
      };
    }

    else {
        document.getElementById("comboResults").innerHTML = "<b><font color=red>Double check the score type</font></b>";
        document.getElementById("comboReactiveText").innerHTML = "";
    };

  } // end else if decisionP==D3

};



