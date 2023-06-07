const TelegramBot = require('node-telegram-bot-api');
const { program } = require('commander');

const token = '5442536140:AAHfRj9nQMH5_H00_IZm_K5HL8CIamXjrOM';

const bot = new TelegramBot(token, { polling: true });

program.command('send-message <message>')
    .description('Send message to Telegram Bot')
    .action((message) => {
    bot.sendMessage('531926296', message).then(() => {
        console.log('Message was sent successfully')
    })
});

program.command('send-photo <PhotoPath>')
    .description('Send photo to Telegram Bot')
    .action((PhotoPath) => {
        bot.sendPhoto('531926296', PhotoPath).then(() => {
            console.log('Photo was sent successfully')
        })
    });

program.parse(process.argv)