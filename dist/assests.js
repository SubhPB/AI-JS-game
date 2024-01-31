"use strict";
/* -- Byimaan -- */
Object.defineProperty(exports, "__esModule", { value: true });
exports.gapPrint = exports.input = void 0;
const input = (msg) => {
    const readLine = require('readline');
    return new Promise((resolve) => {
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.log('');
        rl.question(msg, (ans) => {
            rl.close();
            resolve(ans.trim());
        });
    });
};
exports.input = input;
const gapPrint = (funcs) => {
    // console.log('')
    if (Array.isArray(funcs)) {
        funcs.forEach(func => func());
    }
    else {
        funcs();
    }
    ;
    console.log('');
};
exports.gapPrint = gapPrint;
