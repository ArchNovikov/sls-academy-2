const fs = require('fs');
const fileContent = fs.readFileSync('vacations.json');
const developers = JSON.parse(fileContent);

const correctVacations = [];

developers.forEach(developer => {
    const existingDeveloper = correctVacations.find(item => item.userId === developer.user._id);

    if (existingDeveloper) {
        const vacation = {
            endDate: developer.endDate,
            startDate: developer.startDate
        }
        existingDeveloper.vacations.push(vacation)
    } else {
        const newDeveloper = {
            userId: developer.user._id,
            userName: developer.user.name,
            vacations: [
                {
                    endDate: developer.endDate,
                    startDate: developer.startDate
                }
            ],
        }
        correctVacations.push(newDeveloper);
    }
})

fs.writeFileSync('correctVacations.json', JSON.stringify(correctVacations, null, 2));