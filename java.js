const gameboard = (() => {

    const board = 
    ["X","O","X",
    "O","X","O",
    "X","O","X"]

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
    function togglePlauerTurn() {
        isPlayer1Turn = !isPlayer1Turn
    }

    // Using Flag in Game Logic
    function makeMove(cell){
        if (isPlayer1Turn) {
            // Player 1's turn
            cell.textContent = "X";
        } else {
            // Player 2's turn
            cell.textContent = "O";
        }
        // After making a move, toggle the turn for next move
        togglePlauerTurn();
    }

})


