const http = require('http');
const server = http.createServer();
const refil = require('fs')

server.on('request', (req, res) => {
    setInterval(() => {
        console.log('hello world');
    }, 5000);
});


const { createReadStream } = refil;

const stream = createReadStream('../content/big.txt', { highWaterMark: 90000, encoding: 'utf8' })


const { readFileSync, writeFileSync } = refil;
const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');


writeFileSync(
    './content/result-sync.txt',
    `Here is the result : ${first}, ${second}`,
    { flag: 'a' }
);


const { readFile, writeFile } = refil;
const util = require('util');
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);
readFile(/content/first.txt, 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log(data);
    }
});

const start = async () => {
    try {
        const first2 = await readFilePromise('./content/first.txt', 'uft8')
        const second2 = await readFilePromise('./content/second.txt', 'uft8')
        await writeFilePromise('./content/result-mind-grenade.txt', `THIS IS AWESOME : ${first2} ${second2}`, {flag: 'a'}); // flag: 'a' means 'append to the file
        console.log(first2, second2);
    } catch (error) {
        console.log(error);
    }
}

start();

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', (err, data) => {
//             if(err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         })
//     }
// )}
// getText('./content/first.txt')
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));
