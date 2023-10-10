//array with all possible winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//variable with x-class as a string. This class lives in index.css file
const X_CLASS = 'x-class';
//variable with o-class as a string. This class lives in index.css file
const O_CLASS = 'o-class';

//cellElements variable queries all divs with data-index
const cellElements = document.querySelectorAll('[data-index]');
//winningMessage variable queries the winning message div using jquery
const winningMessage = $('#winningMessage');
//variable circleTurn created to determine who's turn it is
let circleTurn;

//START GAME/RESET BUTTON
//queries the button with reset id and add an on click even then runs a function
$('#reset').on('click', () => {
  //starts the startGame function
  startGame();
  //Sets the text of the button to Reset
  $('#reset').text('Reset');
  //removes the classes alert alert-success alert-warning from the winning message div
  winningMessage.removeClass('alert alert-success alert-warning');
  //removes the class bg-success from the button
  $('#reset').removeClass('bg-success');
  //adds the class bg-danger to the button
  $('#reset').addClass('bg-danger');
});

//function startGame
function startGame() {
  //sets the circleTurn variable to false
  circleTurn = false;
  //Grabs the elements from cellElements variable and forEach cell been passed though, it removes the variables X_CLASS and O_CLASS which contain the classes in the index.css file
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    //adds and event listener to each div once
    cell.addEventListener('click', handleClick, { once: true });
  });
  //changes the text of the winning message to an empty string.
  winningMessage.text('');
}

//function handleClick passes e as an argument
function handleClick(e) {
  //we take the target of what is passed and place it in a cell variable
  const cell = e.target;
  //if circleTurn is true the O_CLASS is active if not then X_CLASS is. This is then saved in a variable
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  //placeMark function is executed passing the variables of cell and currentClass as arguments
  placeMark(cell, currentClass);
  //if checkWin function is true which passes currentClass as an argument
  if (checkWin(currentClass)) {
    //endGame runs passing false then we have a winner and the game ends
    endGame(false);
    //else if isDraw() is passed
  } else if (isDraw()) {
    //endGame function passes true as an argument which ends the game
    endGame(true);
    //if nothing else is true
  } else {
    //we run the swapTurns function
    swapTurns();
  }
}

//placeMark function takes cell and currentClass as arguments
function placeMark(cell, currentClass) {
  //adds the current playing class to the class attribute to the cell that was clicked
  cell.classList.add(currentClass);
}

//function swapTurns changes circleTurn to the opposite which changes the turn of what it currently is
function swapTurns() {
  circleTurn = !circleTurn;
}

//function checkWin passes currentClass as an argument
function checkWin(currentClass) {
  //we check all the arrays inside of the array winningCombinartions and pass combination as an argument
  return winningCombinations.some((combination) => {
    //we check each item inside of the arrays passed through combination and pass index as an argument
    return combination.every((index) => {
      //we check the current class of each of the cellElements with the index passed through to check that it contains the current class in the combinations passed thorugh to check for a winner
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

//function endGame passes through draw
function endGame(draw) {
  //if it is draw
  if (draw) {
    //we change the text of the winning message to Draw! and add the classes alert alert-warning to the same div
    winningMessage.text('Draw!');
    winningMessage.addClass('alert alert-warning');
    //if nothing else is true
  } else {
    //we change the text of the winning message depending if it's circle turn it changes to O's if not it changes to X's then the word win. We then add the classes alert alert-success to the same div
    winningMessage.text(`${circleTurn ? "O's" : "X's"} Win!`);
    winningMessage.addClass('alert alert-success');
  }
}

//function draw
function isDraw() {
  //returns cellments distructed in order to check every then we pass cell as an argument for every
  return [...cellElements].every((cell) => {
    //we return if the class list of every cell contains the classes of the variables X_CLASS or O_CLASS
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
