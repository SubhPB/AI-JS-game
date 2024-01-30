"use strict";
/* -- Byimaan -- */
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = void 0;
const input = (msg) => {
    const readLine = require('readline');
    return new Promise((resolve) => {
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(msg, (ans) => {
            rl.close();
            resolve(ans);
        });
    });
};
exports.input = input;
