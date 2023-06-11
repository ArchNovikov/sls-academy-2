const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const token = '6163430599:AAFb98f_pZMT4saMDQ0BXPhHteWnitCjEpY';
const privatApiKey = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
const monoApiKey = 'https://api.monobank.ua/bank/currency';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = 'Hello! I\'m a exchange rates bot\n';
    const options = {
        reply_markup: {
            keyboard: [
                [
                    {text: 'Exchange rates'},
                ],
            ],
            resize_keyboard: true,
        },
    }

    bot.sendMessage(chatId, message, options);
});

bot.onText(/Exchange rates/, (msg) => {
    const chatId = msg.chat.id;
    const message = 'Choose the currency';
    const options = {
        reply_markup: {
            keyboard: [
                [
                    {text: 'USD'},
                    {text: 'EUR'}
                ],
            ],
            resize_keyboard: true,
        },
    };

    bot.sendMessage(chatId, message, options);
})

bot.onText(/USD/, async (msg) => {
    const chatId = msg.chat.id;
    const message = await usdRate();

    bot.sendMessage(chatId, message, {});
})

bot.onText(/EUR/, async (msg) => {
    const chatId = msg.chat.id;
    const message = await eurRate();

    bot.sendMessage(chatId, message);
})

async function eurRate() {
    const privatRate = await axios.get(privatApiKey);
    const privateBuy = Number(privatRate.data[0].buy).toFixed(2);
    const privateSale = Number(privatRate.data[0].sale).toFixed(2);
    
    try {
        const monoRate = await axios.get(monoApiKey);
        const monoBuy = Number(monoRate.data[1].rateBuy).toFixed(2);
        myCache.set("monoBuyEUR", monoBuy, 60);
        const monoSale = Number(monoRate.data[1].rateSell).toFixed(2);
        myCache.set("monoSaleEUR", monoSale, 60)
        return `Actual exchange rates of EUR:\nPrivat Bank: Buy: ${privateBuy} | Sell: ${privateSale}\nMonobank: Buy: ${monoBuy} | Sell: ${monoSale}`;
    } catch (e) {
        return `Actual exchange rates of EUR:\nPrivat Bank: Buy: ${privateBuy} | Sell: ${privateSale}\nMonobank: Buy: ${myCache.get("monoBuyEUR")} | Sell: ${myCache.get("monoSaleEUR")}`;
    }
}

async function usdRate() {
    const privatRate = await axios.get(privatApiKey);
    const privateBuy = Number(privatRate.data[1].buy).toFixed(2);
    const privateSale = Number(privatRate.data[1].sale).toFixed(2);

    try {
        const monoRate = await axios.get(monoApiKey);
        const monoBuy = Number(monoRate.data[0].rateBuy).toFixed(2);
        myCache.set("monoBuyUSD", monoBuy, 60);
        const monoSale = Number(monoRate.data[0].rateSell).toFixed(2);
        myCache.set("monoSaleUSD", monoSale, 60);
        return `Actual exchange rates of USD:\nPrivat Bank: Buy: ${privateBuy} | Sell: ${privateSale}\nMonobank: Buy: ${monoBuy} | Sell: ${monoSale}`;
    } catch (e) {
        return `Actual exchange rates of USD:\nPrivat Bank: Buy: ${privateBuy} | Sell: ${privateSale}\nMonobank: Buy: ${myCache.get("monoBuyUSD")} | Sell: ${myCache.get("monoSaleUSD")}`;
    }
}
