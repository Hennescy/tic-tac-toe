const display = (() => {
    const addMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }
    return {
        addMessage,
    }
})();







const gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}"> ${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", game.addMark);
        })
    } 

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }
    const getGameboard = () => gameboard;
    return {
        render,
        update,
        getGameboard
    }
    

})();


const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}


const game =(() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
            
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        gameboard.render();
    
    }


    const restart = () => {
        for (let i = 0; i < 9; i++) {
            gameboard.update(i, "");
        }
        display.addMessage("");
        gameboard.render();
        game.start();

    }

    const addMark = (e) => {
        if(gameOver){
            return;
        }

        let index = parseInt(e.target.id.split("-")[1]);

        if (gameboard.getGameboard()[index] !== "")
            return;
        gameboard.update(index, players[currentPlayerIndex].mark);

        if (checkForWin(gameboard.getGameboard(), players[currentPlayerIndex].mark)){
            gameOver = true;
            display.addMessage(`${players[currentPlayerIndex].name} WINS !!`);
        }
        else if (checkForTie(gameboard.getGameboard())) {
            display.addMessage("It's a tie !!");
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    
    return {
        start,
        addMark,
        restart
    }

})();

function checkForWin(board) {
    const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 8],
        [8, 4, 0],
        [2, 4, 6]
    ]
    for (let i = 0; i < combinations.length; i++) {
        const [a, b , c] = combinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
        
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== "")
}


const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    game.start();

});


const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    game.restart();
} )