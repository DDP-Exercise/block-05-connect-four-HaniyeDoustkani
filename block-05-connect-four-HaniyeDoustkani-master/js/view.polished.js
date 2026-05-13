"use strict";

//TODO: Think of this view as your game board.
//      Your view should listen to various custom events of your model.
//      For each event of your model, there should be a clear visual
//      representation of what's going on.


//TODO: Update the field. Show the whole battlefield with all the stones
//      that are already played.


import { model } from "./model.connectfour.js";

const view = {
    renderBoard(board) {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";

        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                const cell = document.createElement("div");

                cell.classList.add("cell");
                cell.dataset.column = column;


                for (let stone of model.winningStones) {
                    if (stone[0] === row && stone[1] === column) {
                        cell.classList.add("winner");
                    }
                }

                if (board[row][column] === "Y") {
                    cell.classList.add("yellow");
                }

                if (board[row][column] === "R") {
                    cell.classList.add("red");
                }

                boardElement.appendChild(cell);
            }
        }
    },




//TODO: Show the current player

showCurrentPlayer(player) {
    const winnerElement = document.getElementById("winner");
    winnerElement.textContent = "Current player: " + player;
},

//TODO: Notify the player when the game is over. Make it clear how the
//      Game ended. If it's a win, show the winning stones.

    showGameOver(event) {
        const winnerElement = document.getElementById("winner");

        if (event.detail.isDraw) {
            winnerElement.textContent = "Draw!";
        } else {
            winnerElement.textContent = "Winner: " + event.detail.winner;
        }
    }
};

    export { view };