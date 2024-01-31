/* -- Byimaan -- */

import { input } from "./assests";
import { gapPrint } from "./assests";

interface Game {
    gameBoard(): Array<Array<string>>;
    printBoard(): void;
    checkWinner(square: number, letter: string): boolean;
    countEmptySlots(): number;
    isEmptySlot(square: number): boolean;
    getAvailableMoves(): number[];
    acquireSlot(square: number, letter: string):boolean;
}

export class TicTacToe implements Game{

    board: Array<Array<string>>;
    gameIsOver: boolean;
    winner: string | null;

    constructor(){
        this.board = this.gameBoard();
        this.winner = null;
        this.gameIsOver = false;
    };

    gameBoard(){
        return Array.from( {length: 3}, () => Array(3).fill(' '));
    };

    printBoard(printIndex ?: boolean){
        let tempBoard = [...this.board];
        if (printIndex){
            tempBoard = this.board.map( (_ , ind) => Array.from({length: 3}, (v, i) => String(i + ind*3) ));
        };
        [0,1,2].forEach( ind => {
            console.log('| ' + tempBoard[ind].join(' | ') + ' |');
        });
    };

    checkWinner(square: number, letter: string){

        const _checkRow = () => {
            const rowIndex = Math.floor(square/3);
            const isWinner = this.board[rowIndex].every( sq => sq === letter );
            return isWinner;
        };

        const _checkCol = () => {
           const colIndex = square % 3;
           const isWinner = this.board.map( row => row[colIndex] );
           return isWinner.every(sq => sq === letter)
        };

        const _checkDia = () => {
            const dia1Winner = [0,1,2].every( sq => this.board[sq][sq] === letter);
            const dia2Winner = [0,1,2].every( sq => this.board[sq][2-sq] === letter);
            return dia1Winner || dia2Winner
        };

        this.gameIsOver = _checkRow() || _checkCol() || _checkDia();
        if (this.gameIsOver) {
            this.winner = letter;
            gapPrint(()=>console.log(`GameOver: -- Congratulations!, player '${this.winner}' has won the match!. -- `));
        };

        return this.gameIsOver;
    };

    countEmptySlots(){
        let count = 0;
        this.board.forEach( row => (row.forEach( slot => slot === ' ' ? count++ : count)));
        return count;
    };

    isEmptySlot(square: number){
        const row = Math.floor(square/3);
        const col = square % 3;
        return this.board[row][col] === ' ';
    };

    getAvailableMoves(){
        // getIndex converts the row and col index in to single array index between (0-8)
        const getIndex = (rowInd:number,colInd:number): number => rowInd + colInd + 2*rowInd ;
        let availableSlots: any[] = this.board.map( (row,rowInd) => (row.map((slot,slotInd) => slot === ' ' ? getIndex(rowInd,slotInd) : null)));
        availableSlots = availableSlots.reduce( (acc,val) => acc.concat(val),[]);
        return availableSlots.filter( slot => slot !== null);
    };

    acquireSlot(square:number, letter: string){
        const row = Math.floor(square/3);
        const col = square % 3;
        if (this.getAvailableMoves().includes(square)){
            this.board[row][col] = letter;
            this.checkWinner(square,letter)
            return true;
        }
        return false;
    };

};

// const game = new TicTacToe();
// game.board[0][2] = 'X'
// game.board[1][1] = 'X'
// game.board[2][0] = 'X'
// console.log('is game over ? ',game.gameIsOver)
// game.checkWinner(2,'X')
// game.printBoard()
// console.log('')
// console.log(game.getAvailableMoves())
// console.log('is game over ? ',game.gameIsOver)

