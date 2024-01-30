/* -- Byimaan -- */


export const input = (msg: string):any => {
    const readLine = require('readline');
    return new Promise( (resolve) => {
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(msg, (ans:string)  => {
            rl.close();
            resolve(ans);
        });
    });
};