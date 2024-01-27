let initialBoardState = [];
let finalBoardState = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('initialPegs.json')
        .then(response => response.json())
        .then(data => {
            initialBoardState = data.rows; // Save the initial state
            setupBoard(initialBoardState);
        });

    fetch('finalPegs.json')
        .then(response => response.json())
        .then(data => finalBoardState = data.rows);

    document.getElementById('run-button').addEventListener('click', processCommands);
    document.getElementById('reset-button').addEventListener('click', resetBoard);
});


function setupBoard(rows) {
    const board = document.getElementById('peg-solitaire-board');
    board.innerHTML = ''; // Clear existing board

    rows.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        row.forEach(peg => {
            const pegDiv = document.createElement('div');
            pegDiv.className = 'peg-hole';
            if (peg === 1) {
                pegDiv.classList.add('peg');
            }
            rowDiv.appendChild(pegDiv);
        });

        board.appendChild(rowDiv);
    });
    console.log(initialBoardState[4][2]);
}

function resetBoard() {
    // Fetch the initial board state again and reset the board
    fetch('initialPegs.json')
        .then(response => response.json())
        .then(data => {
            initialBoardState = data.rows;
            setupBoard(initialBoardState);
        });
}

// Modify processCommands to no longer auto-run on textarea change
function processCommands() {
    const commands = document.getElementById('move-text').value.split('\n');
    const delay = parseInt(document.getElementById('delay-input').value) || 500;

    commands.reduce((promise, command, index) => {
        return promise.then(() => {
            return new Promise(resolve => {
                if (command.trim().startsWith('(bicie')) {
                    executeCommand(command.trim());
                }
                setTimeout(resolve, delay);
            });
        });
    }, Promise.resolve()).then(compareFinalState); // Compare the final state after all commands
}


function executeCommand(command) {
    const regex = /\(bicie p(\d+)(\d+) p(\d+)(\d+) p(\d+)(\d+)\)/;
    const match = command.match(regex);

    if (match) {
        const [_, startX, startY, pegToDeleteX, pegToDeleteY, endX, endY] = match.map(Number);
        console.log(startX, startY, pegToDeleteX, pegToDeleteY, endX, endY);

        if (isValidMove(startX, startY, pegToDeleteX, pegToDeleteY, endX, endY)) {
            makeMove(startX, startY, pegToDeleteX, pegToDeleteY, endX, endY);
        } else {
            alert('Invalid move: ' + command);
        }
    } else {
        alert('Invalid command format: ' + command);
    }
}

function isValidMove(startX, startY, pegToDeleteX, pegToDeleteY, endX, endY) {
    // Check if indices are within the bounds of the board
    if (!isIndexValid(startX, startY) || !isIndexValid(pegToDeleteX, pegToDeleteY) || !isIndexValid(endX, endY)) {
        console.log("Index not valid");
        return false;
    }

    // Check if the starting peg exists, the peg to delete exists, and the ending position is empty
    if (initialBoardState[startX - 1][startY - 1] !== 1 ||
        initialBoardState[pegToDeleteX - 1][pegToDeleteY - 1] !== 1 ||
        initialBoardState[endX - 1][endY - 1] !== 0) {
        console.log("Pegs not valid");
        return false;
    }

    // Check if all pegs are in a straight line
    return isInStraightLine(startX, startY, pegToDeleteX, pegToDeleteY, endX, endY);
}

function isInStraightLine(startX, startY, pegToDeleteX, pegToDeleteY, endX, endY) {
    // Vertical line check (Y coordinates are the same)
    if (startY === pegToDeleteY && pegToDeleteY === endY) {
        // Check if the X coordinates (rows) are consecutive
        return Math.abs(startX - endX) === 2 && Math.abs(startX - pegToDeleteX) === 1;
    }

    // Horizontal line check (X coordinates are the same)
    if (startX === pegToDeleteX && pegToDeleteX === endX) {
        return Math.abs(startY - endY) === 2 && Math.abs(startY - pegToDeleteY) === 1;
    }

    // Diagonal line check (for triangular board)
    // Check if the pegs are aligned diagonally
    if (Math.abs(startX - endX) === 2 && Math.abs(startY - endY) === 2) {
        // Ensure the middle peg is actually between the start and end pegs
        return pegToDeleteX === (startX + endX) / 2 && pegToDeleteY === (startY + endY) / 2;
    }

    return false; // Return false if none of the above conditions are met
}




function isIndexValid(x, y) {
    return x > 0 && y > 0 && x <= initialBoardState.length && y <= initialBoardState[x - 1].length;
}

function makeMove(startX, startY, pegToDeleteX, pegToDeleteY, endX, endY) {
    // Setting the starting peg and the peg to delete to empty (0)
    initialBoardState[startX - 1][startY - 1] = 0;
    initialBoardState[pegToDeleteX - 1][pegToDeleteY - 1] = 0;

    // Setting the ending position to have a peg (1)
    initialBoardState[endX - 1][endY - 1] = 1;

    // Re-render the board to reflect the changes
    setupBoard(initialBoardState);
}

function compareFinalState() {
    for (let i = 0; i < initialBoardState.length; i++) {
        for (let j = 0; j < initialBoardState[i].length; j++) {
            if (initialBoardState[i][j] !== finalBoardState[i][j]) {
                alert("You didn't match the final state.");
                return;
            }
        }
    }
    alert("Congratulations! You've matched the final state.");
}