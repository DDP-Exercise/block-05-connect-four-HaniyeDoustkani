"use strict";

//TODO: Think of this model as the game-logic.
//      The model knows everything that is necessary to manage
//      the game. It knows the players, know who's turn it is,
//      knows all the stones and where they are, knows if the
//      game is over and if so, why (draw or winner). It knows
//      which stones are the winning stones. The model also has
//      sovereignty over the battlefield.
//      First step: Create your model-object with all the properties
//      necessary to store that information.
const model = {
    rows: 6,
    columns: 7,

    board: [],

    playerYellow: "Y",
    playerRed: "R",

    currentPlayer: "Y",

    gameOver: false,
    winner: null,
    isDraw: false,

    winningStones: [],


//TODO: Prepare some customEvents. The model should dispatch events when
//      - The Player Changes
//      - A stone was inserted
//      - The Game is over (Draw or Winner)
//      Don't forget to give your events a namespace.
//      For each customEvent, just make a >method< for your model-object,
//      that, when called, dispatches the event. Nothing else should
//      happen in those methods.


    dispatchPlayerChangedEvent() {
        document.dispatchEvent(
            new CustomEvent("connectfour:playerchanged")
        );
    },

    dispatchStoneInsertedEvent() {
        document.dispatchEvent(
            new CustomEvent("connectfour:stoneinserted")
        );
    },

    dispatchGameOverEvent() {
        document.dispatchEvent(
            new CustomEvent("connectfour:gameover", {
                detail: {
                    winner: this.winner,
                    isDraw: this.isDraw,
                    winningStones: this.winningStones
                }
            })
        );
    },

//TODO: Initiate the battlefield. Your model needs a representation of the
//      battlefield as data (two-dimensional array). Obviously, there are
//      no stones yet in the field.

    initializeBoard() {
        this.board = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
        ];

    },


//TODO: The model should offer a method to insert a stone at a given column.
//      If the stone can be inserted, the model should insert the stone,
//      dispatch an event to let the world know that the battlefield has changed
//      and check if the game is over now.
//      Hint: This method will be called later by your controller, when the
//      user makes an according input.

    insertStone(column) {
        if (this.gameOver) {
            return;
        }
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board [row][column] === null) {
                this.board[row][column] = this.currentPlayer;
                this.dispatchStoneInsertedEvent();
                this.checkGameOver();
                if (!this.gameOver) {
                    this.changePlayer();
                }
                break;
            }

        }
    },


//TODO: Methods to check if the game is over, either by draw or a win.
//      Let the world know in both cases what happend. If it's a win,
//      Don't forget to store the winning stones and add this >detail<
//      to your custom event.


    checkGameOver() {
        this.checkWin();

        if (!this.gameOver) {
            this.checkDraw();
        }
    },

    checkWin() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {

                if (this.board[row][column] === this.currentPlayer) {

                    if (
                        column + 3 < this.columns &&
                        this.board[row][column + 1] === this.currentPlayer &&
                        this.board[row][column + 2] === this.currentPlayer &&
                        this.board[row][column + 3] === this.currentPlayer
                    ) {
                        this.gameOver = true;
                        this.winner = this.currentPlayer;
                        this.winningStones = [
                            [row, column],
                            [row, column + 1],
                            [row, column + 2],
                            [row, column + 3]
                        ];
                        this.dispatchGameOverEvent();
                        return;
                    }

                    if (
                        row + 3 < this.rows &&
                        this.board[row + 1][column] === this.currentPlayer &&
                        this.board[row + 2][column] === this.currentPlayer &&
                        this.board[row + 3][column] === this.currentPlayer
                    ) {
                        this.gameOver = true;
                        this.winner = this.currentPlayer;
                        this.winningStones = [
                            [row, column],
                            [row + 1, column],
                            [row + 2, column],
                            [row + 3, column]
                        ];
                        this.dispatchGameOverEvent();
                        return;
                    }

                    if (
                        row + 3 < this.rows &&
                        column + 3 < this.columns &&
                        this.board[row + 1][column + 1] === this.currentPlayer &&
                        this.board[row + 2][column + 2] === this.currentPlayer &&
                        this.board[row + 3][column + 3] === this.currentPlayer
                    ) {
                        this.gameOver = true;
                        this.winner = this.currentPlayer;
                        this.winningStones = [
                            [row, column],
                            [row + 1, column + 1],
                            [row + 2, column + 2],
                            [row + 3, column + 3]
                        ];
                        this.dispatchGameOverEvent();
                        return;
                    }

                    if (
                        row + 3 < this.rows &&
                        column - 3 >= 0 &&
                        this.board[row + 1][column - 1] === this.currentPlayer &&
                        this.board[row + 2][column - 2] === this.currentPlayer &&
                        this.board[row + 3][column - 3] === this.currentPlayer
                    ) {
                        this.gameOver = true;
                        this.winner = this.currentPlayer;
                        this.winningStones = [
                            [row, column],
                            [row + 1, column - 1],
                            [row + 2, column - 2],
                            [row + 3, column - 3]
                        ];
                        this.dispatchGameOverEvent();
                        return;
                    }
                }
            }
        }
    },

    checkDraw() {

        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {

                if (this.board[row][column] === null) {
                    return;
                }

            }
        }

        this.gameOver = true;
        this.isDraw = true;
        this.dispatchGameOverEvent();
    },




//TODO: Method to change the current player (and dispatch the according event).


    changePlayer() {

        if (this.currentPlayer === this.playerYellow) {
            this.currentPlayer = this.playerRed;
        } else {
            this.currentPlayer = this.playerYellow;
        }

        this.dispatchPlayerChangedEvent();
    }

};

export { model };