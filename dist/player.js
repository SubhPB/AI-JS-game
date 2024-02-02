"use strict";
/*  -- Byimaan --

*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIplayer = exports.ComputerPlayer = exports.HumanPlayer = exports.Player = void 0;
const assests_1 = require("./assests");
const assests_2 = require("./assests");
class Player {
    constructor(letter) {
        this.letter = letter.toUpperCase();
    }
    ;
}
exports.Player = Player;
;
class HumanPlayer extends Player {
    constructor(letter) {
        super(letter);
    }
    ;
    askMove(game, waitTime, msg = `TicTacToe: Player ${this.letter}'s turn. `) {
        return __awaiter(this, void 0, void 0, function* () {
            const _isValid = (sq) => {
                return game.getAvailableMoves().includes(sq);
            };
            let val = yield (0, assests_2.input)(msg);
            if (val.toLowerCase() === 'quit') {
                return Promise.reject('');
            }
            ;
            val = Number(val);
            if (_isValid(val)) {
                game.acquireSlot(val, this.letter);
                return Promise.resolve('');
            }
            else {
                yield this.askMove(game, waitTime, "TicTacToe: Input Error!, Please provide a valid input. ");
            }
            ;
        });
    }
    ;
}
exports.HumanPlayer = HumanPlayer;
;
class ComputerPlayer extends Player {
    constructor(letter) {
        super(letter);
    }
    ;
    askMove(game, waitTime = 1200) {
        return __awaiter(this, void 0, void 0, function* () {
            const _isValid = (sq) => {
                return game.getAvailableMoves().includes(sq);
            };
            const randomSlot = Math.floor(Math.random() * game.getAvailableMoves().length);
            const playerChoice = game.getAvailableMoves()[randomSlot];
            console.log(`TicTacToe: Player ${this.letter}'s turn, waiting for response...`);
            if (_isValid(playerChoice)) {
                yield new Promise(resolve => {
                    const waitingTime = setTimeout(() => {
                        game.acquireSlot(playerChoice, this.letter);
                        (0, assests_1.gapPrint)(() => console.log(`TicTacToe: Player ${this.letter}'s went to ${playerChoice}th slot. `));
                        resolve();
                    }, waitTime);
                });
                return Promise.resolve('');
            }
            else {
                return Promise.reject('');
            }
            ;
        });
    }
    ;
}
exports.ComputerPlayer = ComputerPlayer;
;
class AIplayer extends Player {
    constructor(letter) {
        super(letter);
    }
    ;
    askMove(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const _isValid = (sq) => {
                return game.getAvailableMoves().includes(sq);
            };
            if (game.countEmptySlots() === 9) {
                const randomSlot = Math.floor(Math.random() * 9);
                if (_isValid(randomSlot)) {
                    game.acquireSlot(randomSlot, this.letter);
                    return Promise.resolve('');
                }
                else {
                    return Promise.reject('');
                }
            }
            else {
                const aImove = this.minimaxAI(game, this.letter);
                console.log('TicTacToe: value of AImove for debugging - ', aImove);
                if (typeof aImove['position'] === 'number') {
                    game.acquireSlot(aImove['position'], this.letter);
                    return Promise.resolve('');
                }
                else {
                    return Promise.reject('');
                }
            }
        });
    }
    ;
    minimaxAI(state, player) {
        const maxPlayer = this.letter;
        const otherPlayer = player === 'X' ? 'O' : 'X';
        if (state.winner === otherPlayer) {
            const _getScore = otherPlayer === maxPlayer ? (state.countEmptySlots() + 1) : (-1 * state.countEmptySlots() - 1);
            return { position: null, score: _getScore };
        }
        else if (state.countEmptySlots() === 0) {
            return { position: null, score: 0 };
        }
        ;
        let best;
        if (player === maxPlayer) {
            best = { position: null, score: -Infinity };
        }
        else {
            best = { position: null, score: Infinity };
        }
        ;
        for (let move of state.getAvailableMoves()) {
            state.acquireSlot(move, player, true);
            const simMove = this.minimaxAI(state, otherPlayer);
            state.undoMove(move);
            state.winner = null;
            state.gameIsOver = false;
            simMove.position = move;
            if (player === maxPlayer) {
                if (simMove.score > best.score) {
                    best = simMove;
                }
                ;
            }
            else {
                if (simMove.score < best.score) {
                    best = simMove;
                }
                ;
            }
            ;
        }
        ;
        return best;
    }
    ;
}
exports.AIplayer = AIplayer;
;
