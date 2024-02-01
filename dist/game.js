"use strict";
/* -- Byimaan -- */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToe = void 0;
const assests_1 = require("./assests");
class TicTacToe {
    constructor() {
        this.board = this.gameBoard();
        this.winner = null;
        this.gameIsOver = false;
    }
    ;
    gameBoard() {
        return Array.from({ length: 3 }, () => Array(3).fill(' '));
    }
    ;
    printBoard(printIndex) {
        let tempBoard = [...this.board];
        if (printIndex) {
            tempBoard = this.board.map((_, ind) => Array.from({ length: 3 }, (v, i) => String(i + ind * 3)));
        }
        ;
        [0, 1, 2].forEach(ind => {
            console.log('| ' + tempBoard[ind].join(' | ') + ' |');
        });
    }
    ;
    checkWinner(square, letter, silent = false) {
        const _checkRow = () => {
            const rowIndex = Math.floor(square / 3);
            const isWinner = this.board[rowIndex].every(sq => sq === letter);
            return isWinner;
        };
        const _checkCol = () => {
            const colIndex = square % 3;
            const isWinner = this.board.map(row => row[colIndex]);
            return isWinner.every(sq => sq === letter);
        };
        const _checkDia = () => {
            const dia1Winner = [0, 1, 2].every(sq => this.board[sq][sq] === letter);
            const dia2Winner = [0, 1, 2].every(sq => this.board[sq][2 - sq] === letter);
            return dia1Winner || dia2Winner;
        };
        this.gameIsOver = _checkRow() || _checkCol() || _checkDia();
        if (this.gameIsOver) {
            this.winner = letter;
            if (!silent)
                (0, assests_1.gapPrint)(() => console.log(`GameOver: -- Congratulations!, player '${this.winner}' has won the match!. -- `));
        }
        ;
        return this.gameIsOver;
    }
    ;
    countEmptySlots() {
        let count = 0;
        this.board.forEach(row => (row.forEach(slot => slot === ' ' ? count++ : count)));
        return count;
    }
    ;
    isEmptySlot(square) {
        const row = Math.floor(square / 3);
        const col = square % 3;
        return this.board[row][col] === ' ';
    }
    ;
    getAvailableMoves() {
        // getIndex converts the row and col index in to single array index between (0-8)
        const getIndex = (rowInd, colInd) => rowInd + colInd + 2 * rowInd;
        let availableSlots = this.board.map((row, rowInd) => (row.map((slot, slotInd) => slot === ' ' ? getIndex(rowInd, slotInd) : null)));
        availableSlots = availableSlots.reduce((acc, val) => acc.concat(val), []);
        return availableSlots.filter(slot => slot !== null);
    }
    ;
    acquireSlot(square, letter, silent = false) {
        const row = Math.floor(square / 3);
        const col = square % 3;
        if (this.getAvailableMoves().includes(square)) {
            this.board[row][col] = letter;
            this.checkWinner(square, letter, silent);
            return true;
        }
        return false;
    }
    ;
    undoMove(square) {
        const row = Math.floor(square / 3);
        const col = square % 3;
        this.board[row][col] = ' ';
    }
}
exports.TicTacToe = TicTacToe;
;
