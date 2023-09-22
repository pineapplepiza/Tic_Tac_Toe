const gameboard = (() => {

    const board = 
    ["X","O","X",
    "O","X","O",
    "X","O","X"]

    // Trying to make a class function thing.
    const player = function (turn, score, icon) {
        return{
            turn: turn,
            score: score,
            icon: icon,
        };
    };

    // Trying to make objects for each player.
    const p1 = player(true, 0, "X")
    const p2 = player(false, 0, "O")


    const moves = 0;

    // Maybe make a function and return p1 and p2?
    if (moves / 2 == 0){
        p1 = true
        p2 = false
    } else {
        p2 = true
        p1 = false
    }

    const gameFlow = {

    }


})

