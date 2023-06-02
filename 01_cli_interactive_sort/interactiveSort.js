const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const start = () => {
    rl.question("Enter words of digits dividing them in spaces\n", input => {

        if (input === 'exit') return console.log('Good bye!');
        input = input.toLowerCase().split(' '); // from string to array

        rl.question("How would u like to sort values?\n" +
            "1. Words by name (A-Z)\n" +
            "2. Show digits from the smallest\n" +
            "3. Show digits from the biggest\n" +
            "4. Words by quantity of leters\n" +
            "5. Only unique words\n" +
            "6. Only unique values (words and digits)\n" +
            "Select 1-6 and press Enter: ", sort => {

            switch (sort) {
                case '1':
                    input = deleteDigits(input);
                    console.log(sortByName(input));
                    break;
                case '2':
                    input = deleteWords(input);
                    console.log(sortFromSmaller(input));
                    break;
                case '3':
                    input = deleteWords(input);
                    console.log(sortFromBigger(input));
                    break;
                case '4':
                    input = deleteDigits(input);
                    console.log(sortByLength(input));
                    break;
                case '5':
                    input = deleteDigits(input);
                    console.log(sortByUnique(input));
                    break;
                case '6':
                    console.log(sortByUnique(input));
                    break;
            }

            start();
        })

    })

}

start();

function sortFromSmaller(input) {
    return input.sort().toString();
}

function sortFromBigger(input) {
    return input.sort().reverse().toString();
}

function sortByName(input) {
    return input.sort().toString();
}

function sortByLength(input) {
    return input.sort(function (a, b) {
        return a.length - b.length;
    }).toString();
}

function sortByUnique(input) {
    return Array.from(new Set(input)).toString();
}

function deleteWords(array) {
    return array.filter((value) => {
        return !isNaN(value)
    })
}

function deleteDigits(array) {
    return array.filter((value) => {
        return isNaN(value);
    })
}
