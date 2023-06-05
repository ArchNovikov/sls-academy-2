const inquirer = require('inquirer');
const fs = require('fs');

let db = [];
try {
    db = db.concat(JSON.parse(fs.readFileSync('db.txt', 'utf-8')));
} catch (e) {

}

function addUser() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the user\'\s name. To cancel press ENTER: '
        }]).then((answer) => {
            if (answer.name === '') {
                searchUser();
            } else {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'gender',
                        message: 'Choose gender',
                        choices: ['Male', 'Female']
                    },
                    {
                        type: 'input',
                        name: 'age',
                        message: 'Enter age: '
                    }]).then((answers => {
                    const user = {
                        name: answer.name,
                        gender: answers.gender,
                        age: answers.age
                    };

                    db.push(user)
                    fs.writeFileSync('db.txt', JSON.stringify(db))

                    addUser();
                }))
            }
        }
    )
}

function searchUser() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'choice',
            message: 'Do you want to find user? Y/N',
        }]).then(answers => {
        if (answers.choice.toLowerCase() === 'n') {
            return console.log("Bye!");
        } else {
            inquirer.prompt([{
                type: 'input',
                name: 'name',
                message: 'Enter name for search: ',
            }]).then((answers) => {
                const searchName = answers.name.toLowerCase();
                let foundUser = false;

                db.forEach((user) => {
                    if (user.name.toLowerCase() === searchName) {
                        console.log(user);
                        foundUser = true;
                    }
                })

                if (!foundUser) console.log('User not found');
            })
        }
    })
}

addUser()
