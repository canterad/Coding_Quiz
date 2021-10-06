// Define HighScores Object:
let HighScoresObj = 
{
  strInitials: "",
  strScore: ""
};

// Define Questions:
const Question1 =
{
  Question: "Commonly used data types DO NOT<br>include:",
  btn1Text: "1. strings",
  btn2Text: "2. booleans",
  btn3Text: "3. alerts",
  btn4Text: "4. numbers",
  Answer: 3,
  QuestionNo: 1
};

const Question2 =
{
  Question: "The condition in an if / else statement is<br>enclosed within _______.",
  btn1Text: "1. quotes",
  btn2Text: "2. curly brackets",
  btn3Text: "3. parentheses",
  btn4Text: "4. square brackets",
  Answer: 2,
  QuestionNo: 2
};

const Question3 =
{
  Question: "Arrays in JavaScript can be used to store<br>_______.",
  btn1Text: "1. numbers and strings",
  btn2Text: "2. other arrays",
  btn3Text: "3. booleans",
  btn4Text: "4. all of the above",
  Answer: 4,
  QuestionNo: 3
};

const Question4 =
{
  Question: "String values must be enclosed within _______<br>when being assigned to variables.",
  btn1Text: "1. commas",
  btn2Text: "2. curley brackets",
  btn3Text: "3. quotes",
  btn4Text: "4. parentheses",
  Answer: 3,
  QuestionNo: 4
};

const Question5 =
{
  Question: "A very useful tool used during development<br>and debugging for printing content to the<br>debugger is:",
  btn1Text: "1. JavaScript",
  btn2Text: "2. terminal / bash",
  btn3Text: "3. for loops",
  btn4Text: "4. console.log",
  Answer: 4,
  QuestionNo: 5
};

// Define Variables:
let TimeValue = null;
let btnQuizStart = null;
let QuestionText = null;
let QuestionBtn1 = null;
let QuestionBtn2 = null;
let QuestionBtn3 = null;
let QuestionBtn4 = null;
let AnswerResponse = null;
let Initials = null;
let btnSubmit = null;
let HighScoreLink = null;
let QuizStart = null;
let Question = null;
let QuizEnd = null;
let Response = null;
let TimeElement = null;
let EndResponse = null;
let EndAnswerResponse = null;
let ScoreValue = null;

let InitPassed = true;
let szMissingElement = "";
let DomElements = null;
let nQuizQuestionNo = 0;
let nQuizTimer = 0;
let CurrentQuestion = null;
let nIndex = 0;
let szLastAnswerResult = "";
let hasQuizEnded = false;

// Call Function to get all of the elements for this HTML document.
InitPassed = AreAllElementsFound();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// If any of the elements were not found then I disable all of the buttons so the user cannot do anything when
// the web page is displayed.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (InitPassed == false)
{
  DomElements = document.getElementsByTagName("button");

  for (nIndex = 0; nIndex < DomElements.length; nIndex++)
  {
     DomElements[nIndex].disabled = true;
  }
}

// Hide the Timer on the start page.
if (TimeElement != null)
{
  TimeElement.style.visibility = "hidden";
}

// Hide the Question Section.
if (Question != null)
{
  Question.style.display = "none";
}

// Hide the Quiz End Section.
if (QuizEnd != null)
{
  QuizEnd.style.display = "none";
}

// If any of the elements were not found tell the user about this issue.
if (InitPassed == false)
{
  window.alert("The \"Coding Quiz Challenge\" application cannot start\r\n\r\n" +
  "The following problem occurred:\r\n" +
  "The \"" + szMissingElement + "\" element was not found.");  
}

// Set up an Event Listener click event for the "Start Quiz" button.
if (btnQuizStart != null)
{
  btnQuizStart.addEventListener("click", StartQuiz);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: DisplayQuizEnd
// This function was created so the Quiz End section could be displayed based on the following conditions:
// 1. The timer ended.
// 2. The user finished the Quiz before the timer ended.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DisplayQuizEnd()
{
  // Update the timer value.
  TimeValue.innerHTML = nQuizTimer.toString();

  // Setting the score for Quiz End section.
  ScoreValue.innerHTML = nQuizTimer.toString();

  // Display the Answer result of last question in the Quiz End section.
  EndAnswerResponse.innerHTML = szLastAnswerResult;

  // Make the HighScoreLink Visible.
  HighScoreLink.style.visibility = "visible";

 // Display and hide the correct sections.  Hide the Quiz Start section and Question Section.  Make the Quiz End section visible.
 QuizStart.style.display = "none";
 Question.style.display = "none";
 QuizEnd.style.display = "flex";  

 // Set the focus to the Initials text control.
 Initials.focus();  
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function setTime
// This is the timer function.  It only decrements the timer value if the quiz has not ended.  If the timer value is less then or equal to
// zero or if the Quiz has ended then the timer is cleared.  If the user did not finish the quiz then call the DisplayQuizEnd function
// to display the Quiz End section, otherwise the user already fininshed the quiz and this has already been done.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setTime()
{
  let timerInterval = setInterval(function()
  {
    // Don't decrement the timer if the quiz has already ended.
    if (!hasQuizEnded)
    {
      nQuizTimer--;
      TimeValue.innerHTML = nQuizTimer.toString();
    }

    // Test to stop the timer if the time has expired or the user has finished the quiz.
    if ((nQuizTimer <= 0) || (hasQuizEnded))
    {
      // Stop the timer.
      clearInterval(timerInterval);

      // If the user did not finish the quiz do the following operations.
      if (!hasQuizEnded)
      {
        nQuizTimer = 0;

        // Call function to display the Quiz End.
        DisplayQuizEnd();
      }
    }
  }, 1000);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: StartQuiz
// Set up all of the events that are needed for this web page.
// Set the question number value to 1 and set the current question to question 1.
// Hide the Question Response section of the question because it is not displayed for question 1.
// Call the function UpdateQuestion passing in the object Question1 to update all of the question elements.
// Set the Timer to 50 seconds and display the timer value.
// Make the timer element visible.
// Hide the HighScores Link element.
// Display the Question section and make the Quiz Start and Quiz End sections hidden.
// After everything has been done, start the timer.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function StartQuiz()
{
  // Set up the click events for the rest of the buttons in this application.
  QuestionBtn1.addEventListener("click", CorrectQuestion);
  QuestionBtn2.addEventListener("click", CorrectQuestion);
  QuestionBtn3.addEventListener("click", CorrectQuestion);
  QuestionBtn4.addEventListener("click", CorrectQuestion);
  btnSubmit.addEventListener("click", SubmitOperation);
  Initials.addEventListener("keydown", TestNoCharsEntered);

  // Set the Quiz Question Number to 1.
  nQuizQuestionNo = 1;

  // Set the Current Question to Question 1.
  CurrentQuestion = Question1;
  
  // Hide the Question Response Section of the Question.
  Response.style.visibility = "hidden";

  // Update Question one.
  UpdateQuestion(Question1);

  // Set the Timer value to 50 seconds.
  nQuizTimer = 50;

  // Update the Timer Displayed.
  TimeValue.innerHTML = nQuizTimer.toString();

  // Make the Time Element Visible.
  TimeElement.style.visibility = "visible";

  // Make the HighScoreLink element invisible.
  HighScoreLink.style.visibility = "hidden";

  // Need to display the Question Section and Hide the others.
  QuizStart.style.display = "none";
  QuizEnd.style.display = "none";
  Question.style.display = "flex";

  // Start the timer.
  setTime();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: UpdateQuestion
// Use the Question Object passed in to update all of the Question elements.  Update the Question text and the button labels.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateQuestion(QuestionObj)
{
  // Set the elements text.
  QuestionText.innerHTML = QuestionObj.Question;
  QuestionBtn1.innerHTML = QuestionObj.btn1Text;
  QuestionBtn2.innerHTML = QuestionObj.btn2Text;
  QuestionBtn3.innerHTML = QuestionObj.btn3Text;
  QuestionBtn4.innerHTML = QuestionObj.btn4Text;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: CorrectQuestion:
// This function is call for all of the Question button click events.  The nQuizQuestionNo variable is tested and the function to 
// answer the associated question is called, for example the function AnswerQ1 is call to answer question one if the 
// nQuizQuestionNo is equal to one.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CorrectQuestion(AnswerBtn)
{
  let Question = null;

  if (nQuizQuestionNo == 1)
  {
    AnswerQ1(AnswerBtn); 
  }
  else if (nQuizQuestionNo == 2)
  {
    AnswerQ2(AnswerBtn); 
  }
  else if (nQuizQuestionNo == 3)
  {
    AnswerQ3(AnswerBtn);
  }
  else if (nQuizQuestionNo == 4)
  {
    AnswerQ4(AnswerBtn);
  }
  else 
  {
    AnswerQ5(AnswerBtn);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: AnswerQ1
// This function performs the operations needed in order to answer question 1.  The button event "AnswerBtn" is passed in.
// The function TestAnswer() is called passing in the button event "AnswerBtn".
// After the answer has been answered, the Question number gets changed to 2.  The current question gets set to question 2.
// The function UpdateQuestion is call to update all of the question elements with the data for Question 2.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AnswerQ1(AnswerBtn)
{
  // Call Function to Test the Answer.
  TestAnswer(AnswerBtn);

  // Set the Quiz Question Number to 2.
  nQuizQuestionNo = 2;

  // Set the current question to question 2.
  CurrentQuestion = Question2;

  // Call Function to update controls for Question 2.
  UpdateQuestion(Question2);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: AnswerQ2
// This function performs the operations needed in order to answer question 2.  The button event "AnswerBtn" is passed in.
// The function TestAnswer() is called passing in the button event "AnswerBtn".
// After the answer has been answered, the Question number gets changed to 3.  The current question gets set to question 3.
// The function UpdateQuestion is call to update all of the question elements with the data for Question 3.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AnswerQ2(AnswerBtn)
{
  // Call Function to Test the Answer.
  TestAnswer(AnswerBtn);

  // Set the Quiz Question Number to 3.
  nQuizQuestionNo = 3;

  // Set the current question to question 3.
  CurrentQuestion = Question3;

  // Call Function to update controls for Question 3.
  UpdateQuestion(Question3);  
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: AnswerQ3
// This function performs the operations needed in order to answer question 3.  The button event "AnswerBtn" is passed in.
// The function TestAnswer() is called passing in the button event "AnswerBtn".
// After the answer has been answered, the Question number gets changed to 4.  The current question gets set to question 4.
// The function UpdateQuestion is call to update all of the question elements with the data for Question 4.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AnswerQ3(AnswerBtn)
{
  // Call Function to Test the Answer.
  TestAnswer(AnswerBtn);

  // Set the Quiz Question Number to 4.
  nQuizQuestionNo = 4;

  // Set the current question to question 4.
  CurrentQuestion = Question4;


  // Call Function to update controls for Question 4.
  UpdateQuestion(Question4);  
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: AnswerQ4
// This function performs the operations needed in order to answer question 4.  The button event "AnswerBtn" is passed in.
// The function TestAnswer() is called passing in the button event "AnswerBtn".
// After the answer has been answered, the Question number gets changed to 5.  The current question gets set to question 5.
// The function UpdateQuestion is call to update all of the question elements with the data for Question 5.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AnswerQ4(AnswerBtn)
{
  // Call Function to Test the Answer.
  TestAnswer(AnswerBtn);

  // Set the Quiz Question Number to 5.
  nQuizQuestionNo = 5;

  // Set the current question to question 5.
  CurrentQuestion = Question5;

  // Call Function to update controls for Question 5.
  UpdateQuestion(Question5);  
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: AnswerQ5
// This function performs the operations needed in order to answer question 5.  The button event "AnswerBtn" is passed in.
// The function TestAnswer() is called passing in the button event "AnswerBtn".
// After the answer has been answered, the variable "hasQuizEnded" is set to true and the function "DisplayQuizEnd" is
// called to display the Quiz End section and hide the Quiz Start and Question sections.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AnswerQ5(AnswerBtn)
{
  // Call Function to Test the Answer.
  TestAnswer(AnswerBtn);

  // Set variable so know quiz ended to stop timer.
  hasQuizEnded = true;

   // Call New Routine instead of doing code below.
  DisplayQuizEnd();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: SubmitOperation
// This function is the click event for the "Submit" button.
// It test the length of the Initials string.  If it is zero, nothing has been entered then prompt the user and exit.
// Get the users initials entered and the score of the quiz and save them to local storage.
// Then redirect the user to the HighScores web page.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SubmitOperation()
{
  // Test the length of the Initials string, if user did not enter any then prompt them and return.
  if (Initials.value.length == 0)
  {
    window.alert("Coding Quiz Challenge\r\n\r\nYou must enter your Initials!\r\n\r\nPlease enter them before hitting the \"Submit\" button.");
    return;
  }

  // Get the Key and Value.
  HighScoresObj.strInitials = Initials.value;
  HighScoresObj.strScore = nQuizTimer.toString();

  // Save values to Local Storage.
  localStorage.setItem("HighScores", JSON.stringify(HighScoresObj));

  // Go to the HighScores Page.
  window.location.href = "highscores.html";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: TestAnswer
// This function will test the answer the user selected.  The button element is passed into this function.
// Set the initial value for the Answer Response variable to "Correct!".
// Get the data-number for the button selected and convert it to an integer value.
// Test the button data-number against the answer value for the question.  If not equal set Answer respond to "Wrong!".
//
// Set the variable szLastAnswerResult equal to the Answer Response variable value.  The variable szLastAnswerResult is used by the
// function "DisplayQuizEnd" so this value will be displayed when the Quiz End section is displayed for what ever question was last
// being answered when either the quiz ended or the timer ended.
//
// If the question number is not question 5 then make the answer response section on the question section visible and display the 
// response, otherwise display the response to the response section on the Quiz End section.
//
// After everything has been done.  If the question was answered incorrectly decrement 10 seconds from the timer value and
// update the timer element.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TestAnswer(AnswerBtn)
{
  let szAnswerNumber = "";
  let szAnswerResponse = "Correct!"
  let nAnswerNumber = 0;
  let element = AnswerBtn.target;
 
  szAnswerNumber = element.getAttribute("data-number");
  nAnswerNumber = parseInt(szAnswerNumber);

  // Test if the answer was correct or not.
  if (nAnswerNumber != CurrentQuestion.Answer)
  {
    // Need to update the Answer Response.
    szAnswerResponse = "Wrong!"
  }  

  // Save the Answer Response to display on Quiz End page.
  szLastAnswerResult = szAnswerResponse;

  if (CurrentQuestion.QuestionNo != 5)
  {
    AnswerResponse.innerHTML = szAnswerResponse;
    Response.style.visibility = "visible";
  }
  else
  {
    EndAnswerResponse.innerHTML = szAnswerResponse;
  }

  // Do this at the end of this function, do all the stuff above first
  // before the timer value gets changed.
  if (nAnswerNumber != CurrentQuestion.Answer)
  {
    // Subtract 10 from the Quiz Timer Value.
    nQuizTimer -= 10;

    // If the value is less than zero, set it to zero.
    if (nQuizTimer <= 0)
    {
      nQuizTimer = 0;
    }

    // Need to update the timer element.
    TimeValue.innerHTML = nQuizTimer.toString();
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: TestNoCharsEntered
// This function tests the characters entered in the initials text input control.  The keydown event calls this function.
// If the key value is a backspace or delete character then return so these keystrokes will be processed by the control.
// If the key value is Arrow Up or Arrow Down the return so these keystokes will be processed by the control.
// If the key value is Home or End the return so these keystrokes will be processed by the control.
//
// if the key value is a space then call event.preventDefault so the keystoke will not be processed by the control and return.
// I am not allowing spaces to be entered.
//
// If the key value is a numeric character 0 - 9, then call event.preventDefault so the keystroke will not be processed by the
// control and return.  I am not allowing any numeric characters to be entered.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TestNoCharsEntered(event)
{
  // If the event.key is a backspace or delete then return.
  if ((event.key == "Backspace") || (event.key == "Delete"))
    return;

  // If the event.key is an arrow key then return.
  if ((event.key == "ArrowUp") || (event.key == "ArrowDown") || (event.key == "ArrowLeft") || (event.key == "ArrowRight"))
    return;

  // If the event.key is the Home or End key then return.
  if ((event.key == "Home") || (event.key == "End"))
    return;

  // Test for spaces, don't allow them to be entered and return.
  if (event.key == " ")
  {
    event.preventDefault();
    return;
  }

  // Don't allow number to be entered.
  if ((event.keyCode >= 48) && (event.keyCode <= 57))
  {
    event.preventDefault();
    return;    
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: AreAllElementsFound
// This function gets all of the element ID values for all of the elements that are used in my JavaScript code.
// The variable isElementFound is set to the initial value of true.
// If any of the document.getElementById calls return a null value then the isElementFound variable is set to false and the
// szMissingElement is set to the elements name.
// At the end of this function the isElementFound value is returned.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AreAllElementsFound()
{
  let isElementFound = true;

  // Get this button element first.  Need to have it so can disable this button if any other
  // elements are missing.
  btnQuizStart = document.getElementById("QuizStartButton");
  //btnQuizStart = null;
  if (btnQuizStart == null)
  {
    szMissingElement = "Quiz Start Button";
    isElementFound = false;
  }

  TimeValue = document.getElementById("TimeValue");
  //TimeValue = null;
  if (TimeValue == null)
  {
    szMissingElement = "Time Value";
    isElementFound = false;
  }
  
  QuestionText = document.getElementById("QuestionText");
  //QuestionText = null;
  if (QuestionText == null)
  {
    szMissingElement = "Question Text";
    isElementFound = false;    
  }
  
  QuestionBtn1 = document.getElementById("QuestionBtn1");
  //QuestionBtn1 = null;
  if (QuestionBtn1 == null)
  {
    szMissingElement = "Question One Button";
    isElementFound = false;    
  }
  
  QuestionBtn2 = document.getElementById("QuestionBtn2");
  //QuestionBtn2 = null;
  if (QuestionBtn2 == null)
  {
    szMissingElement = "Question Two Button";
    isElementFound = false;
  }
  
  QuestionBtn3 = document.getElementById("QuestionBtn3");
  //QuestionBtn3 = null;
  if (QuestionBtn3 == null)
  {
    szMissingElement = "Question Three Button";
    isElementFound = false;
  }
  
  QuestionBtn4 = document.getElementById("QuestionBtn4");
  //QuestionBtn4 = null;
  if (QuestionBtn4 == null)
  {
    szMissingElement = "Question Four Button";
    isElementFound = false;
  }
  
  AnswerResponse = document.getElementById("AnswerResponse");
  //AnswerResponse = null;
  if (AnswerResponse == null)
  {
    szMissingElement = "Answer Response";
    isElementFound = false;
  }

  btnSubmit = document.getElementById("Submit");
  //btnSubmit = null;
  if (btnSubmit == null)
  {
    szMissingElement = "Submit Button";
    isElementFound = false;    
  }

  HighScoreLink = document.getElementById("HighScoreLink");
  //HighScoreLink = null;
  if (HighScoreLink == null)
  {
    szMissingElement = "High Score Link";
    isElementFound = false;
  }
  
  QuizStart = document.getElementById("QuizStart");
  //QuizStart = null;
  if (QuizStart == null)
  {
    szMissingElement = "Quiz Start Section";
    isElementFound = false;
  }
  
  Question = document.getElementById("Question");
  //Question = null;
  if (Question == null)
  {
    szMissingElement = "Question Section";
    isElementFound = false;    
  }
  
  QuizEnd = document.getElementById("QuizEnd");
  //QuizEnd = null;
  if (QuizEnd == null)
  {
    szMissingElement = "Quiz End Section";
    isElementFound = false;    
  }  

  Response = document.getElementById("Response");
  //Response = null;
  if (Response == null)
  {
    szMissingElement = "Response Section";
    isElementFound = false;    
  }  

  TimeElement = document.getElementById("TimeElement");
  //TimeElement = null;
  if (TimeElement == null)
  {
    szMissingElement = "Time Element";
    isElementFound = false;    
  }  

  EndResponse = document.getElementById("EndResponse");
  //EndResponse = null;
  if (EndResponse == null)
  {
    szMissingElement = "End Response";
    isElementFound = false;    
  }  

  EndAnswerResponse = document.getElementById("EndAnswerResponse");
  //EndAnswerResponse = null;
  if (EndAnswerResponse == null)
  {
    szMissingElement = "End Answer Response";
    isElementFound = false;    
  }    
 
  Initials = document.getElementById("Initials");
  //Initials = null;
  if (Initials == null)
  {
    szMissingElement = "Initials";
    isElementFound = false;    
  }    

  ScoreValue = document.getElementById("ScoreValue");
  //ScoreValue = null;
  if (ScoreValue == null)
  {
    szMissingElement = "ScoreValue";
    isElementFound = false;    
  }    

  return (isElementFound);
}
