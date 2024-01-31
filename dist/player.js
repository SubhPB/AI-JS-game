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
exports.ComputerPlayer = exports.HumanPlayer = exports.Player = void 0;
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
    askMove(game, msg = `TicTacToe: Player ${this.letter}'s turn. `) {
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
                yield this.askMove(game, "TicTacToe: Input Error!, Please provide a valid input. ");
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
    askMove(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const _isValid = (sq) => {
                return game.getAvailableMoves().includes(sq);
            };
            const randomSlot = Math.floor(Math.random() * game.getAvailableMoves().length);
            const playerChoice = game.getAvailableMoves()[randomSlot];
            if (_isValid(playerChoice)) {
                game.acquireSlot(playerChoice, this.letter);
                (0, assests_1.gapPrint)(() => console.log(`TicTacToe: Player ${this.letter}'s went to ${playerChoice}th slot. `));
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
