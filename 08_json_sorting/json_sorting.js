const axios = require('axios');
const endpoints = [
    'https://jsonbase.com/sls-team/json-793',
    'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231',
    'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-93',
    'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770',
    'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281',
    'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310',
    'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469',
    'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516',
    'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706',
    'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350',
    'https://jsonbase.com/sls-team/json-64'
];

async function init() {
    let trueCounter = 0;
    let falseCounter = 0;

    for (const endpoint of endpoints) {
        let isDone;
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                let data = await axios.get(endpoint).then(response => {
                    return response.data;
                });
                isDone = findIsDone(data)
            } catch (e) {
                if (attempt < 2) {
                    console.log(`Repeat request ${endpoint}`);
                } else {
                    console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
                }
            }
        }

        if (isDone === true) {
            trueCounter++;
            console.log(`[Success] ${endpoint}: isDone - True`);
        }
        else if (isDone === false) {
            falseCounter++;
            console.log(`[Success] ${endpoint}: isDone - False`);
        }

    }
    console.log(`Found true values: ${trueCounter}\nFound false values: ${falseCounter}`);
}

function findIsDone(data) {
    if (data.hasOwnProperty('isDone')) {
        return data.isDone;
    }

    for (let key in data) {
        if (typeof data[key] === 'object') {
            const result = findIsDone(data[key])
            if (result !== undefined) {
                return result;
            }
        }
    }
}

init();