# Coding_Quiz
This is Home Work Assignment #4 for the UNH Coding Boot Camp.  Create a Coding Quiz Web Application.

Developer: Duane Cantera
Date: Oct. 9, 2021
Assignment: 04 Web APIs: Coding Quiz

********************
LOCATION OF FILES:
********************

Main Folder:

index.html
highscores.html
README

assets folder:
    css folder
        style

    js
        index
        highscores

****************
PAGE LAYOUT:
****************

index.html

< main >
    < header >  - High Score Link and Timer Value
    < section > - Quiz Start Section 
    < section > - Question Section
    < section > - Quiz End Section

This web page is broken up into 4 sections.  There is the header that displays the High Score Link and Timer Value and is always visible.
Then there are three sections.  The Quiz Start Section, Question Section and Quiz End Section.  These sections
are hidden and made visible base on what operation is being performed.


highscores.html

< main >
    < header > - High Score data elements

This web page contains one header section that contains all of the High Score data elements.


*********************
DEVELOPMENT ISSUES:
*********************

Issue: Testing if I am able to retrieve all of the elements needed by my JavaScript code for each web page.
Solution: In my JavaScript files for each web page I get all of the elements that I will be using and test if any of them come back with a null 
value.  If any of them come back null I disable all of the buttons so when the web page is displayed the user cannot do anything and I prompt the user with a message telling them that the application cannot be run because of this problem.


Issue: Design Issue for dealing with the display of the Quiz Start, Questions and the Quiz End information.
Solution: I set up the index.html web page to have four sections, one is the header which is visible all of the time and displays the
High Scores Link and the timer value.  The other section are the Quiz Start section, Question section and Quiz End section.  I make these
section hidden and visible based on what needs to be performed.  I use the display = "none" option so the space that the hidden sections 
would take up is removed.


Issue: How to display the questions?
Solution: I created the questions as constant objects.  I call a routine that updates the question elements passing in the question object.


Issue: How to determine which question button was selected by the user.
Solution: I used the data-number="1" option for each button element.  I am then able to use the following statement to get the button number.
szAnswerNumber = element.getAttribute("data-number"); 

Issue: Processing the text box Initials input.
Solution: I limited the number of characters to three by using the option maxlength="3" for the text input element.  I also test the event
key value for the keydown event.  If the backspace, delete, arrow keys, Home and End keys are pressed I let these events go through to the
control.  If a numeric key or the space key is entered then I use the event.preventDefault(); command so the event will not be passed onto
the text input element.


***************
LINKS:
***************

Link To Deployed Application: https://canterad.github.io/Coding_Quiz/
