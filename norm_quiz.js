/*<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://www.javascriptsource.com -->

<!-- Begin */
// Insert number of questions
var numQues = 1;

// Insert number of choices in each question
var numChoi = 4;

// Insert number of questions displayed in answer area
var answers = new Array(1);

// Insert answers to questions
answers[0] = "All ABC High's 9th grade students in the current school year";


// Do not change anything below here ...
function checkAnswer(form) {
  var score = 0;
  var currElt;
  var currSelection;
  for (i=0; i<numQues; i++) {
    currElt = i*numChoi;
    for (j=0; j<numChoi; j++) {
      currSelection = form.elements[currElt + j];
      if (currSelection.checked) {
        if (currSelection.value == answers[i]) {
          score++;
 	        document.getElementById("quizResults").innerHTML = "<font color=blue><b>Correct!</b></font> Since we want to compare Mary's score to her 9th grade schoolmates in order to find out if she was among the top ranked students, the norm group is all ABC High's 9th grade students in the current school year.";		
          break;
        } 
	      else {
	        document.getElementById("quizResults").innerHTML = "<font color=red><b>Incorrect :-( </b></font> Remember that prizes will be given to 9th grade students who scored at the top 10% in Math I at ABC High. <br><b>Try again!</b>";		
          break;	
	      }
	    }
    }
  }
  
};
//  End -->


