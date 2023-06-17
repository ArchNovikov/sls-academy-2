const fs = require('fs');
const path = require('path');

const folderPath = '2kk_words_400x400';
const fileNames = fs.readdirSync(folderPath);

const usernames = [];
let fileContent;

for (let fileName of fileNames) {
    const filePath = path.join(folderPath, fileName);

    fileContent = fs.readFileSync(filePath, 'utf-8');

    usernames.push(fileContent.split('\n'))
}

function uniqueValues(array) {
    let unique = [];
    for (let i in array) {
        unique = unique.concat(array[i])
    }
    unique = Array.from(new Set(unique));

    return unique.length;
}

function existInAllFiles(arrays) {
    const uniqueUsernames = arrays.map(array => new Set(array));
    const usernamesInAllFiles = uniqueUsernames.reduce((commonUsernames, set) => new Set([...commonUsernames].filter(username => set.has(username))));

    return usernamesInAllFiles.size;
}

function existInAtleastTen(arrays) {
    const counters = new Map();
    let count = 0;

    for (const array of arrays) {
        const uniqueUsernames = new Set(array);

        for (const username of uniqueUsernames) {
            counters.set(username, (counters.get(username) || 0) + 1);
            if (counters.get(username) === 10) {
                count++;
            }
        }
    }

    return count;
}

console.time('Время выполнения')
console.log(uniqueValues(usernames));
console.log(existInAllFiles(usernames));
console.log(existInAtleastTen(usernames));
console.timeEnd('Время выполнения')