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

const X_CLASS = 'x-class';
const O_CLASS = 'o-class';

const cellElements = document.querySelectorAll('[data-index]');
const winningMessage = $('#winningMessage');
let circleTurn;

//Start Game/Reset button
$('#reset').on('click', () => {
  startGame();
  $('#reset').text('Reset');
  winningMessage.removeClass('alert alert-success alert-warning');
  $('#reset').removeClass('bg-success');
  $('#reset').addClass('bg-danger');
});

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.text('');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMessage.text('Draw!');
    winningMessage.addClass('alert alert-warning');
  } else {
    winningMessage.text(`${circleTurn ? "O's" : "X's"} Win!`);
    winningMessage.addClass('alert alert-success');
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
