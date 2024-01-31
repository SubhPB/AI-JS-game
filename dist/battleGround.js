"use strict";
/* -- Byimaan --  */
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
const game_1 = require("./game");
const player_1 = require("./player");
const assests_1 = require("./assests");
function battleGround() {
    return __awaiter(this, void 0, void 0, function* () {
        const humanPlayer = new player_1.HumanPlayer('X');
        //const computerPlayer = new ComputerPlayer('O');
        const oppoentPlayer = new player_1.AIplayer('O');
        const game = new game_1.TicTacToe();
        (0, assests_1.gapPrint)(() => game.printBoard(true));
        console.log(`TicTacToe: Enter 'quit' to quit the game.`);
        function switchTurns(currPlayer) {
            return __awaiter(this, void 0, void 0, function* () {
                if (game.countEmptySlots() <= 0 || game.gameIsOver) {
                    if (!game.winner) {
                        console.log('TicTacToe: Match got tied!');
                    }
                    ;
                    console.log('TicTacToe: Match is over...');
                    return;
                }
                ;
                const playerMove = currPlayer.askMove(game);
                yield playerMove.then(res => {
                    (0, assests_1.gapPrint)(() => game.printBoard());
                }).catch(err => {
                    game.gameIsOver = true;
                    (0, assests_1.gapPrint)(() => console.log('TicTacToe:  Quitting the game... '));
                }).finally(() => {
                    const otherPlayer = currPlayer === humanPlayer ? oppoentPlayer : humanPlayer;
                    switchTurns(otherPlayer);
                });
            });
        }
        ;
        yield switchTurns(humanPlayer);
    });
}
;
battleGround();
