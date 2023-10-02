const gameboard = (() => {

    const gameBoard = ["", "", "", "", "", "", "", "", ""]

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


    // Initialize a boolean flag
    let isPlayer1Turn = true;

    // Function to Toggle the Flag
    function togglePlayerTurn() {
        isPlayer1Turn = !isPlayer1Turn
    }

    const cells = document.querySelectorAll('.cell');


    function checkWin(currentPlayer){
        if (
            checkRowWin(currentPlayer)
        ) {
            console.log('Player ${currentPlayer} wins!')
        }
    }

    // Check for a win or a draw and handle game logic
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

    // Using Flag in Game Logic
    function makeMove(cell, index){
        // Determine who's turn it is
        const currentPlayer = isPlayer1Turn ? "X" : "O"

        cell.textContent = currentPlayer

        // Updating the cell on the array
        gameboard[index] = currentPlayer;
        

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


