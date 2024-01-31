/*  -- Byimaan --

*/

import { inherits } from "util";
import { TicTacToe } from "./game";
import { gapPrint } from "./assests";
import { input } from "./assests";
import { setCookie } from "undici-types";

export class Player{
    letter: string;
    constructor(letter:string){
        this.letter = letter.toUpperCase();
    };
};

export class HumanPlayer extends Player{
    constructor(letter: string){
        super(letter);
    };

    async askMove(game: TicTacToe, msg: string = `TicTacToe: Player ${this.letter}'s turn. `){

        const _isValid = (sq: number):boolean => {
            return game.getAvailableMoves().includes(sq)
        };
        
        let val = await input(msg);

        if (val.toLowerCase() === 'quit'){
            return Promise.reject('');
        };

        val = Number(val);

        if (_isValid(val)){
            game.acquireSlot(val,this.letter);
            return Promise.resolve('');
        } else {
            await this.askMove(game, "TicTacToe: Input Error!, Please provide a valid input. ");  
        };

    };
};

export class ComputerPlayer extends Player{
    constructor(letter: string){
        super(letter);
    };

    async askMove(game: TicTacToe){

        const _isValid = (sq: number):boolean => {
            return game.getAvailableMoves().includes(sq)
        };

        const randomSlot = Math.floor(Math.random()*game.getAvailableMoves().length);
        const playerChoice = game.getAvailableMoves()[randomSlot];
        
        if (_isValid(playerChoice)){

            game.acquireSlot(playerChoice, this.letter);
            gapPrint(() => console.log(`TicTacToe: Player ${this.letter}'s went to ${playerChoice}th slot. `));
            return Promise.resolve('')
            
        } else {
            return Promise.reject('');
        };

    };
}