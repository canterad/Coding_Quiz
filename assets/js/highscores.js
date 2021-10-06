// Define HighScores Object:
let HighScoresObj = 
{
  strInitials: "",
  strScore: ""
};

// Declare variables"
let HighScoresList = null;
let btnGoBack = null;
let btnClearScores = null;
let isElementFound = true;
let szMissingElement = "";
let DomElements = null;
let nIndex = 0;
let HighScoresData = null; 
let li = null;

// Get The Elements that are used by this JavaScrip code.
HighScoresList = document.getElementById("HighScoresList");
//HighScoresList = null;
if (HighScoresList == null)
{
  szMissingElement = "High Scores List";
  isElementFound = false;    
}  

btnGoBack = document.getElementById("btnGoBack");
//btnGoBack = null;
if (btnGoBack == null)
{
  szMissingElement = "Go Back Button";
  isElementFound = false;    
}  

btnClearScores = document.getElementById("btnClearScores");
//btnClearScores = null;
if (btnClearScores == null)
{
  szMissingElement = "Clear Highscores Button";
  isElementFound = false;    
} 

// If any of the elements were not found then disable all of the buttons so the user cannot do anything.
// Prompt the user and tell them about this problem.
if (!isElementFound)
{
  DomElements = document.getElementsByTagName("button");

  for (nIndex = 0; nIndex < DomElements.length; nIndex++)
  {
     DomElements[nIndex].disabled = true;
  }  

  window.alert("The \"Highscores\" application cannot start\r\n\r\n" +
  "The following problem occurred:\r\n" +
  "The \"" + szMissingElement + "\" element was not found.");    
}
// Otherwise get the High Scores data from local storage, create the list elements and append them to the ordered list.
// Set up the click events for the GoBack and ClearScores buttons. 
else
{
  // Get the HighScores local data. 
  HighScoresObj = JSON.parse(localStorage.getItem("HighScores"));
  
  if (HighScoresObj != null) 
  {
    li = document.createElement("li");
    li.textContent = HighScoresObj.strInitials + " - " + HighScoresObj.strScore;
    HighScoresList.appendChild(li);      
  }

  // Set up the click events for the buttons in this application.
  btnGoBack.addEventListener("click", GoBack);   
  btnClearScores.addEventListener("click", ClearScores);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: GoBack
// Redirect the user to the Computer Quiz web page.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GoBack()
{
  // Go back to the Computer Quiz web page.
  window.location.href = "index.html";
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: ClearScores
// Call the clear function of the localStorage object to clear out local storage.
// Then reload this web page.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ClearScores()
{
  // Clear local storage.
  localStorage.clear();

  // Reload this page.
  location.reload();
}