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
        if (checkRowWin(currentPlayer) ) {

            // Figuring out which player got 3 in a row
            const p = currentPlayer == 'X' ? p1 : p2 
            
            // Updating player score
            p.score ++

            // Updating the scoreboard text content
            if (p == p1) {
                scoreBoardP1.textContent = `P1: ${p.score}`
            } else {
                scoreBoardP2.textContent = `P1: ${p.score}`
            }

            boardReset();
        
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
        
        gameBoard = Array(9).fill(""); // Reset the gameboard array

        // gameBoard = ["", "", "", "", "", "", "", "", ""];
    }

    // Check for a win handle game logic
    // First 3 horizontal rows, 3 vertical rows, 2 diagonal rows.
    function checkRowWin(player) {
        return (
            (gameBoard[0] === player && gameBoard[1] === player && gameBoard[2] === player) ||
            (gameBoard[3] === player && gameBoard[4] === player && gameBoard[5] === player) ||
            (gameBoard[6] === player && gameBoard[7] === player && gameBoard[8] === player) ||
            (gameBoard[0] === player && gameBoard[3] === player && gameBoard[6] === player) ||
            (gameBoard[1] === player && gameBoard[4] === player && gameBoard[7] === player) ||
            (gameBoard[2] === player && gameBoard[5] === player && gameBoard[8] === player) ||
            (gameBoard[0] === player && gameBoard[4] === player && gameBoard[8] === player) ||
            (gameBoard[6] === player && gameBoard[4] === player && gameBoard[2] === player)
        );
    }

    // MAYBE MAKE A FUNCTION TO CHECK FOR DRAW?

    // Reset board if the cells are filled up and there's no win (DRAW)
    /* function checkDraw(){
        if ((gameBoard.includes("") == false) && (checkRowWin() == false)) {
            boardReset()
        }
    }*/


    // Using Flag in Game Logic
    function makeMove(cell, index){
        // Determine who's turn it is
        const currentPlayer = isPlayer1Turn ? "X" : "O"

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


