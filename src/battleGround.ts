/* -- Byimaan --  */

import { TicTacToe } from "./game";
import { HumanPlayer, ComputerPlayer, Player } from "./player";
import { gapPrint } from "./assests";

async function battleGround(){
    const humanPlayer = new HumanPlayer('X');
    const computerPlayer = new ComputerPlayer('O');
    const game = new TicTacToe();

    gapPrint(() => game.printBoard(true));
    console.log(`TicTacToe: Enter 'quit' to quit the game.`)

    async function switchTurns(currPlayer:  HumanPlayer | ComputerPlayer ){

        if (game.countEmptySlots() <= 0 || game.gameIsOver){

            if (!game.winner){
                console.log('TicTacToe: Match got tied!')
            };
            console.log('TicTacToe: Match is over...');
            return;
        };

        const playerMove = currPlayer.askMove(game);
        await playerMove.then( res => {

            gapPrint(() => game.printBoard());

        }).catch( err => {

            game.gameIsOver = true;
            gapPrint(() => console.log('TicTacToe:  Quitting the game... '));

        }).finally( () => {

            const otherPlayer = currPlayer === humanPlayer ? computerPlayer : humanPlayer;
            switchTurns(otherPlayer);

        });
    };
    await switchTurns(humanPlayer);
    
};

battleGround();