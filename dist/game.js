"use strict";
/* -- Byimaan -- */
Object.defineProperty(exports, "__esModule", { value: true });
class TicTacToe {
    constructor() {
        this.board = this.gameBoard();
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
}
;
const game = new TicTacToe();
game.printBoard();
console.log('');
game.printBoard(true);
