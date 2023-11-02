const gameboard = (() => {

    let gameBoard = ["", "", "", "", "", "", "", "", ""]

    // Player function thing.
    const player = function(turn, score, icon) {
        return{
            turn: turn,
            score: score,
            icon: icon,
        };
    };

    // Objects for each player.
    const p1 = player(true, 0, "X")
    const p2 = player(false, 0, "O")

    let ties = 0

    let winningCellsIndices; // Declare it in a higher scope

    // Initialize a boolean flag
    let isPlayer1Turn = true;

    // Function to Toggle the Flag
    function togglePlayerTurn() {
        isPlayer1Turn = !isPlayer1Turn
    }

    const cells = document.querySelectorAll('.cell');

    const scoreBoardP1 = document.querySelector("#p1")
    const scoreBoardP2 = document.querySelector('#p2');

    const tiesCount = document.querySelector('#ties');

    function checkDrawWin(currentPlayer){

        // If 3 in a row do this;
        if (checkRowWin(currentPlayer) != null ) { // ADDED != NULL

            // Figuring out which player got 3 in a row
            const p = currentPlayer == 'X' ? p1 : p2 
            
            // Updating player score
            p.score ++

            // Updating the scoreboard text content
            if (p == p1) {
                scoreBoardP1.textContent = `Player X: ${p.score}`
            } else {
                scoreBoardP2.textContent = `Player O: ${p.score}`
            }

            winningCellsIndices = checkRowWin(currentPlayer)

            if (winningCellsIndices) {
                // Highlight the winning cells with animation
                const winningCells = document.querySelectorAll('.cell'); // Not just winning cells but it selects all cells
                winningCells.forEach(cell => {

                    const cellIndex = parseInt(cell.id.split('-')[1])

                    if (winningCellsIndices.includes(cellIndex) && gameBoard[cellIndex] === currentPlayer) {
                        cell.classList.add('winning-cell'); // Add a class for styling
                        cell.classList.add('winning-animation')
                        
                        //---------------------------------
                        // Listen for the animationend event on this individual cell
                        cell.addEventListener('animationend', () => {
                            // Remove the animation class from this cell
                            cell.classList.remove('winning-animation')
                            boardReset()
                        })
                    }
                });

            } 
        
        // Checking if there's a draw after concluding no 3 in a row.
        } else if(gameBoard.includes("") == false){
            ties++
            tiesCount.textContent = `Ties: ${ties}`
            boardReset()
        }
        

    }

    // Making a function to reset the board not the game.
    function boardReset(){

        cells.forEach(cell => {
            cell.textContent = ""
        })

        isPlayer1Turn = true; // Reset the player turn, assuming player 1 starts

        gameBoard = Array(9).fill(""); // Aka; gameBoard = ["", "", "", "", "", "", "", "", ""];
    }


    const resetBtn = document.querySelector('#resetBtn');
    resetBtn.addEventListener('click', () => {

        boardReset();

        p1.score = 0;
        p2.score = 0;

        scoreBoardP1.textContent = `Player O: ${p1.score}`;
        scoreBoardP2.textContent = `Player O: ${p2.score}`;

        ties = 0
        tiesCount.textContent = `Ties: ${ties}`
    })


    // Check for a win handle game logic
    // First 3 horizontal rows, 3 vertical rows, 2 diagonal rows.
    function checkRowWin(player) {

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
              // Store the indices of the winning cells
              winningCellsIndices = combination;
              return winningCellsIndices;
            }
        }
        return null; // No win
    }



    const winningCombinations = 
    [[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
    ];



    // Using Flag in Game Logic
    function makeMove(cell, index){
        // Determine who's turn it is
        const currentPlayer = isPlayer1Turn ? "X" : "O"

        // Change background color depending on who's turn

        if (currentPlayer == "X") {
            scoreBoardP1.style.backgroundColor = 'red'
            scoreBoardP2.style.backgroundColor = 'green'
        } else {
            scoreBoardP1.style.backgroundColor = 'green'
            scoreBoardP2.style.backgroundColor = 'red'
        }

        // Update the gameboard array and cell content
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer
        
        
        checkDrawWin(currentPlayer)

        // After making a move, toggle the turn for next move
        togglePlayerTurn();
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            // Check if the cell is already occupied before making a move
            if (!cell.textContent) {
                makeMove(cell, index) // Implement your move logic here
            };
        });
    });
    
})();















//-----------------------------------------------------------------------------------------------------------------------------------------------------

// Inside checkRowWin() function
/* return (
            (gameBoard[0] === player && gameBoard[1] === player && gameBoard[2] === player) ||
            (gameBoard[3] === player && gameBoard[4] === player && gameBoard[5] === player) ||
            (gameBoard[6] === player && gameBoard[7] === player && gameBoard[8] === player) ||
            (gameBoard[0] === player && gameBoard[3] === player && gameBoard[6] === player) ||
            (gameBoard[1] === player && gameBoard[4] === player && gameBoard[7] === player) ||
            (gameBoard[2] === player && gameBoard[5] === player && gameBoard[8] === player) ||
            (gameBoard[0] === player && gameBoard[4] === player && gameBoard[8] === player) ||
            (gameBoard[6] === player && gameBoard[4] === player && gameBoard[2] === player)
        ); */


// MAYBE MAKE A FUNCTION TO CHECK FOR DRAW?

    // Reset board if the cells are filled up and there's no win (DRAW)
    /* function checkDraw(){
        if ((gameBoard.includes("") == false) && (checkRowWin() == false)) {
            boardReset()
        }
    }*/

// Inside of checkRowWin

/* winningCellsIndices.forEach(index => {
                const winningCell = document.getElementById(`cell-${index}`); // Replace with your cell identifier
                winningCell.classList.add('winning-cell'); // Add a class for styling
            });

            const winningCells = document.querySelectorAll('.winning-cell'); // Replace with actual selector

            // Apply the animation to each winning cell
            winningCells.forEach(cell => {
            cell.classList.add('winning-animation'); // Add the CSS class with the animation
            });

            // Remove the animation class when the animation ends
            winningCells.forEach(cell => {
                cell.addEventListener('animationend', () => {
                cell.classList.remove('winning-animation');
                });
            }); */


// Inside of if(winningIndices)

 /* // Remove the animation class when the animation ends
                winningCells.forEach(cell => {
                    cell.addEventListener('animationend', () => {
                        cell.classList.remove('winning-animation');
                    });

                });

                boardReset(); */


/* // Listen for the animationend event on any cell (since they should finish at the same time)
                cells[0].addEventListener('animationend', () => {
                    // Remove the animation class from all cells
                    cells.forEach(cell => {
                        cell.classList.remove('winning-animation');
                    })

                    // After animation ends, reset the board
                    boardReset();
                }) */