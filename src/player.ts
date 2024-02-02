/*  -- Byimaan --

*/

import { TicTacToe } from "./game";
import { gapPrint } from "./assests";
import { input } from "./assests";

type Players = HumanPlayer | ComputerPlayer | AIplayer | Player

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

    async askMove(game: TicTacToe, waitTime?: number, msg: string = `TicTacToe: Player ${this.letter}'s turn. `){

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
            await this.askMove(game,waitTime, "TicTacToe: Input Error!, Please provide a valid input. ");  
        };

    };
};

export class ComputerPlayer extends Player{
    constructor(letter: string){
        super(letter);
    };

    async askMove(game: TicTacToe, waitTime: number = 1200){

        const _isValid = (sq: number):boolean => {
            return game.getAvailableMoves().includes(sq)
        };

        const randomSlot = Math.floor(Math.random()*game.getAvailableMoves().length);
        const playerChoice = game.getAvailableMoves()[randomSlot];
        console.log(`TicTacToe: Player ${this.letter}'s turn, waiting for response...`)
        
        if (_isValid(playerChoice)){

            await new Promise<void>( resolve => {
                const waitingTime =  setTimeout( ()=> {
                    game.acquireSlot(playerChoice, this.letter);
                    gapPrint(() => console.log(`TicTacToe: Player ${this.letter}'s went to ${playerChoice}th slot. `));
                    resolve()
                }, waitTime);
            });
            
            return Promise.resolve('');
            
        } else {
            return Promise.reject('');
        };

    };
};

export class AIplayer extends Player{
    constructor(letter: string){
        super(letter)
    };

    async askMove(game: TicTacToe){

        const _isValid = (sq: number):boolean => {
            return game.getAvailableMoves().includes(sq)
        };

        if (game.countEmptySlots() === 9){
            const randomSlot = Math.floor(Math.random()*9);
            if (_isValid(randomSlot)){
                game.acquireSlot(randomSlot, this.letter);
                return Promise.resolve('');
            } else {
                return Promise.reject('');
            }
        } else {
            const aImove = this.minimaxAI(game,this.letter);
            console.log('TicTacToe: value of AImove for debugging - ',aImove);
            if ( typeof aImove['position'] === 'number'){
                game.acquireSlot(aImove['position'], this.letter);
                return Promise.resolve('');
            } else {
                return Promise.reject('')
            }

        }
    };

    minimaxAI(state: TicTacToe, player: string){
        const maxPlayer = this.letter;
        const otherPlayer = player === 'X' ? 'O': 'X';

        if (state.winner === otherPlayer){
            const _getScore: number = otherPlayer === maxPlayer ? (
                state.countEmptySlots() + 1
            ) : (-1* state.countEmptySlots() - 1);
            return {position: null, score: _getScore}
        } else if (state.countEmptySlots() === 0){
            return {position: null, score: 0};
        };

        type outputType = {position: null | number, score: number};
        let best: outputType;
        if (player === maxPlayer){
            best = {position: null, score: -Infinity}
        } else {
            best = {position: null, score: Infinity}
        };

        for(let move of state.getAvailableMoves()){

            state.acquireSlot(move, player, true);
            const simMove: outputType = this.minimaxAI(state, otherPlayer);

            state.undoMove(move);
            state.winner = null;
            state.gameIsOver = false;
            simMove.position = move;

            if (player === maxPlayer){
                if (simMove.score > best.score){
                    best = simMove;
                };
            } else {
                if (simMove.score < best.score){
                    best = simMove
                };
            };
        };
        return best;
    };
};
