//Declaration of player lists & variables
var player1List = [];
var player2List = [];
var fightWord1;
var fightWord2;
var swap;
var turnChecker1;
var turnChecker2;

//Each player chooses their words to battle with on the choose screens
populateList(player1List, 1);
updateScreen(player1List, 1);
populateList(player2List, 4);
updateScreen(player2List, 2);

//When either player presses the attack buttons
onEvent("attackButton1", "click", function( ) {
    //Determines which word has the "greater (comes first)" alphabetical order
    if(fightWord1 < fightWord2){  //if player "wins" the attack, other player loses a character from their word
      fightWord2 = fightWord2.replace(fightWord2[0], '');
      checker();
      setText("fightWord2", fightWord2);
    }
    else if(fightWord2 < fightWord1){ //if player "loses" the attack, they lose a character from their word
      fightWord1 = fightWord1.replace(fightWord1[0], '');
      checker();
      setText("fightWord1", fightWord1);
    }
      
    //Switches turn to other player
    hideElement("attackButton1");
    hideElement("swapButton1");
    hideElement("player1Dropdown");
    setProperty("playerLabel3", "text-color", "white");
    setProperty("playerLabel4", "text-color", "green");
    showElement("attackButton2");
    showElement("swapButton2");
    showElement("player2Dropdown");
  });
onEvent("attackButton2", "click", function( ) {
  if(fightWord2 < fightWord1){
    fightWord1 = fightWord1.replace(fightWord1[0], '');
    checker();
    setText("fightWord1", fightWord1);
  }
  else if(fightWord1 < fightWord2){
    fightWord2 = fightWord2.replace(fightWord2[0], '');
    checker();
    setText("fightWord2", fightWord2);
  }
      
  hideElement("attackButton2");
  hideElement("swapButton2");
  hideElement("player2Dropdown");
  setProperty("playerLabel4", "text-color", "white");
  setProperty("playerLabel3", "text-color", "green");
  showElement("attackButton1");
  showElement("swapButton1");
  showElement("player1Dropdown");
});

//When either player presses the swap buttons
onEvent("swapButton1", "click", function ( ) {
  //Swaps the current fight word with whatever is selected on the dropdown
  swap = getText("player1Dropdown");
  for(var i = 0; i < player1List.length; i++){  //finds the id of where the swap variable was located, removes it
    if(swap == player1List[i]){
      removeItem(player1List, i);
    }
  }
  insertItem(player1List, 0, fightWord1);
  setProperty("player1Dropdown", "options", player1List);
  fightWord1 = swap;
  setText("fightWord1", fightWord1);
  
  //Switches turn to other player
  hideElement("attackButton1");
  hideElement("swapButton1");
  hideElement("player1Dropdown");
  setProperty("playerLabel3", "text-color", "white");
  setProperty("playerLabel4", "text-color", "green");
  showElement("attackButton2");
  showElement("swapButton2");
  showElement("player2Dropdown");
});
onEvent("swapButton2", "click", function ( ) {
  //Swaps the current fight word with whatever is selected on the dropdown
  swap = getText("player2Dropdown");
  for(var i = 0; i < player2List.length; i++){  //finds the id of where the swap variable was located, removes it
    if(swap == player2List[i]){
      removeItem(player2List, i);
    }
  }
  insertItem(player2List, 0, fightWord2);
  setProperty("player2Dropdown", "options", player2List);
  fightWord2 = swap;
  setText("fightWord2", fightWord2);
  
  //Switches turn to other player
  hideElement("attackButton2");
  hideElement("swapButton2");
  hideElement("player2Dropdown");
  setProperty("playerLabel4", "text-color", "white");
  setProperty("playerLabel3", "text-color", "green");
  showElement("attackButton1");
  showElement("swapButton1");
  showElement("player1Dropdown");
});



//Populate List function that allows each player to choose 3 words, which are then stored into a list
//list {list} - list that will store each player's words
//int {int} - used to figure out which text input is selected, allows code below to be stored as a function
//return {list} - returns a list with the inputted words
function populateList(list, int) {
onEvent("wordInput" + int, "change", function( ) {
  appendItem(list, getText("wordInput" + int)); //adds text from the text input into the list
});
onEvent("wordInput" + (int+1), "change", function( ) {
  appendItem(list, getText("wordInput" + (int+1))); //adds text from the text input into the list
});
onEvent("wordInput" + (int+2), "change", function( ) {
  appendItem(list, getText("wordInput" + (int+2))); //adds text from the text input into the list
});

return list;
}


//Update Screen function that transitions between screens, allowing each player to chose their words
//before going into battle with each other
//list {list} - list used to run check if player has chosen enough words
//int {int} - modularizes code to allow it to be a function
function updateScreen(list, int){
  onEvent("doneButton" + int, "click", function( ) {
  if(list.length != 3){ //checks if player has input enough words, if not player is notified to put in more words
    showElement("errorNotif" + int);
    setText("errorNotif" + int, "Please choose 3 WORDS");
  }
  else if (int == 1){ //if it's the first player moves to the second choosing screen for player 2
    setScreen("chooseScreen2");
  }
  else{ //if player 2 moves to the arena screen, sets up and displays words to initialize battle
    setScreen("arenaScreen");
    
    //For loops that determine which word of each player comes first alphabetically
    turnChecker1 = player1List[0];
    for(var i = 1; i < player1List.length; i++){
      if(player1List[i] < turnChecker1){
        turnChecker1 = player1List[i];
      }
    }
 
    turnChecker2 = player2List[0];
    for(i = 1; i < player2List.length; i++){
      if(player2List[i] < turnChecker2){
        turnChecker2 = player2List[i];
      }
    }
    
    //Separating player list and fight word before displaying
    fightWord1 = player1List[0];
    fightWord2 = player2List[0];
    removeItem(player1List, 0);
    removeItem(player2List, 0);
    
    //Setting up display by filling in placeholder with players' inputs
    setText("fightWord1", fightWord1);
    setText("fightWord2", fightWord2);
    setProperty("player1Dropdown", "options", player1List);
    setProperty("player2Dropdown", "options", player2List);
    
    //Compares the turnCheck variables to determine which player goes first based on
    //alphabetical order
    if(turnChecker1 < turnChecker2){
      hideElement("attackButton2");
      hideElement("swapButton2");
      hideElement("player2Dropdown");
      setProperty("playerLabel3", "text-color", "green");
    }
    else if(turnChecker2 < turnChecker1){
      hideElement("attackButton1");
      hideElement("swapButton1");
      hideElement("player1Dropdown");
      setProperty("playerLabel4", "text-color", "green");
    }
    
  }
});
}

//Checker function that executes if the fight word is completely gone, swapping it with the first option on the 
//dropdown
function checker(){
  if(player1List.length == 0){  //if all of player 1's words are gone
    if(fightWord1.length == 0){
       setScreen("endScreen");
       setText("winnerLabel", "PLAYER 2 WINS");
    }
  }
  else if(fightWord1.length == 0){  //if player 1's fight word is depleted
    fightWord1 = player1List[0];
    removeItem(player1List, 0);
    setProperty("player1Dropdown", "options", player1List);
  }
  
  if(player2List.length == 0){  //if all of player 2's words are gone
    if(fightWord2.length == 0){
       setScreen("endScreen");
       setText("winnerLabel", "PLAYER 1 WINS");
    }
  }
  else if(fightWord2.length == 0){  //if player 2's fight word is depleted
    fightWord2 = player2List[0];
    removeItem(player2List, 0);
    setProperty("player2Dropdown", "options", player2List);
  }
}


//Sources

//https://www.scaler.com/topics/javascript-remove-character-from-string/
//for knowledge of .replace() function
