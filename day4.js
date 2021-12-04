const fs = require('fs');
const buffer = fs.readFileSync('input.txt');
const fileContent = buffer.toString();

function getDrawnNumbersAndBoards(text) {
  const partsOfInput = text.split('\n\n');
  const drawnNumbers = partsOfInput[0].split(',').map(el => +el);
  const boards = partsOfInput.slice(1).map(
    board => board.split('\n')
      .filter(line => !!line)
      .map(line => line.trim()
        .replace(/  /g, ' ')
        .split(' ')
        .map(el => ({value: +el, marked: false}))
      )
  );
  return [drawnNumbers, boards];
}

function checkIfWining(board, x, y) {
  let nbVertical = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i][x].marked) nbVertical++;
    if (nbVertical === board.length) return true;
  }
  let nbHorizontal = 0;
  for (let i = 0; i < board[0].length; i++) {
    if (board[y][i].marked) nbHorizontal++;
    if (nbHorizontal === board[0].length) return true;
  }
}

function markNumInBoradAndCheckWinCondition(board, drawnNum) {
  let isWining = false;
  board.forEach((line, y) => {
    line.forEach((numOb, x) => {
      if (numOb.value === drawnNum) {
        numOb.marked = true;
        isWining = isWining || checkIfWining(board, x, y);
      }
    })
  });
  return isWining;
}

function getWiningBoardAndLastDrawnNumber(drawnNumbers, boards) {
  for (let drawnNum of drawnNumbers) {
    let indexBoard = 0;
    for (let board of boards) {
      if (markNumInBoradAndCheckWinCondition(board, drawnNum)) {
        return [boards[indexBoard], drawnNum];
      }
      indexBoard++;
    }
  }
}

(function start() {
  let [drawnNumbers, boards] = getDrawnNumbersAndBoards(fileContent);
  const [winingBoard, winingNumber] = getWiningBoardAndLastDrawnNumber(drawnNumbers, boards);
  let sum = winingBoard.reduce((sum, line) =>
    (line.reduce((accu, nb) => !nb.marked ? (accu + nb.value) : accu, 0) + sum), 0);
  console.log(sum * winingNumber); //10680
})();

// Part 2

function getDrawnNumbersAndBoards(text) {
  const partsOfInput = text.split('\n\n');
  const drawnNumbers = partsOfInput[0].split(',').map(el => +el);
  const boards = partsOfInput.slice(1).map(
    board => board.split('\n')
      .filter(line => !!line)
      .map(line => line.trim()
        .replace(/  /g, ' ')
        .split(' ')
        .map(el => ({value: +el, marked: false}))
      )
  );
  return [drawnNumbers, boards];
}

function checkIfWining(board, x, y) {
  let nbVertical = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i][x].marked) nbVertical++;
    if (nbVertical === board.length) return true;
  }
  let nbHorizontal = 0;
  for (let i = 0; i < board[0].length; i++) {
    if (board[y][i].marked) nbHorizontal++;
    if (nbHorizontal === board[0].length) return true;
  }
}

function markNumInBoradAndCheckWinCondition(board, drawnNum) {
  let isWining = false;
  board.forEach((line, y) => {
    line.forEach((numOb, x) => {
      if (numOb.value === drawnNum) {
        numOb.marked = true;
        isWining = isWining || checkIfWining(board, x, y);
      }
    })
  });
  return isWining;
}

function getLastWiningBoardAndLastDrawnNumber(drawnNumbers, boards) {
  const output = [];
  const finishedBoardsMap = new Map();
  for (let drawnNum of drawnNumbers) {
    let indexBoard = 0;
    for (let board of boards) {
      if (!finishedBoardsMap.has(indexBoard) && markNumInBoradAndCheckWinCondition(board, drawnNum)) {
        finishedBoardsMap.set(indexBoard, true);
        output.unshift([boards[indexBoard], drawnNum]);
      }
      indexBoard++;
    }
  }
  return output[0]; // last one to win (because I used unshift)
}

(function start() {
  let [drawnNumbers, boards] = getDrawnNumbersAndBoards(fileContent);
  const [winingBoard, winingNumber] = getLastWiningBoardAndLastDrawnNumber(drawnNumbers, boards);
  let sum = winingBoard.reduce((sum, line) =>
    (line.reduce((accu, nb) => !nb.marked ? (accu + nb.value) : accu, 0) + sum), 0);
  console.log(sum * winingNumber); //31892
})();
