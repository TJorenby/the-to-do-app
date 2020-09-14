# the-to-do-app

TO DO LIST

---SETUP---

Front End
    [X] Index.html
    [X] Client.js
    [X] Source in jQuery
    [X] Style Sheet
    [X] Layout Template

Server
    [X] Server.js
    [X] NPM installs
    
Database
    [X] To Do Database in Postico
    [X] Database.sql


--BUILD OUT--
    Index.html
        [X] Allow user to create a task (input fields)
            [X] Input Fields and Add Task Button
            [X] Complete Button
                
                
            [X] Delete Button
                [X] Needs to remove Task from DOM as well as database

--FUNCTION REQUIREMENTS--

[X] Task List in Database needs to append to DOM
[X] Option to Add Task
[X] New Task Needs to Append to DOM and get added to Database
[X] Task Complete Button
    [X] Stylisically Change on DOM
    [X] Mark as Complete in Database (is_complete === true)
    [X] Button toggles between T and F in order for client to "undo" mark complete 
[X] Delete Button
    [X] Task removes from DOM
    [X] Task removes from DB    



--STYLING REQUIREMENTS--

    [X] Background color of page
    [X] Font family and size
    [X] Completed Task styling
        [X] Task Complete Btn changes to "undo complete"
        [X] Background container changes colors (greys out and italicized font? - CSS Toggle)


--STRETCH GOALS--
    [X] Git practice - Merge to master using --no-ff
    [X] Styling using Bootstrap on 'feature-styling-bootstrap' branch
    [] Confirm Delete alert using Bootstrap on branch 'feature-confirm-delete'
    [] Sort tasks by priority level and have the option to reverse on branch feature-ordering-task-query
    [] Add "date completed" field when is_complete === true. on branch 'feature-time-completed'


