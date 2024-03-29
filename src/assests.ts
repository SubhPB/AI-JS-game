/* -- Byimaan -- */


export const input = (msg: string):any => {
    const readLine = require('readline');
    return new Promise( (resolve) => {
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('');
        rl.question(msg, (ans:string)  => {
            rl.close();
            resolve(ans.trim());
        });
    });
};

export const gapPrint = (funcs: Function | Array<Function>): void => {
    // console.log('')
    if (Array.isArray(funcs)){
        funcs.forEach( func => func() )
    } else { funcs() };
    console.log('')
};