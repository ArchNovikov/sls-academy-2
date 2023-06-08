const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '5930023606:AAEeZIVzYbLt1wvBSGsZm_09bb1XnDYIExU';
const apiKey = 'c85d12a0047e767e82a6842d7a356c1f';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = `
  Hello! I'm a weather forecast bot\nTo find out the weather forecast, select the city and forecast interval.
  `;

    bot.sendMessage(chatId, message, {
        reply_markup: {
            keyboard: [
                [
                    { text: 'Forecast in Odessa' },
                ],
            ],
            resize_keyboard: true,
        },
    });
});

bot.onText(/Forecast in Odessa/, (msg) => {
    const chatId = msg.chat.id;
    const message = 'Choose the interval:';
    const options = {
        reply_markup: {
            keyboard: [
                [
                    { text: '3 hour interval' },
                    { text: '6 hour interval' },
                ],
            ],
            resize_keyboard: true,
        },
    };

    bot.sendMessage(chatId, message, options);
});

bot.onText(/3 hour interval|6 hour interval/, async (msg) => {
    const chatId = msg.chat.id;
    const interval = msg.text.includes('3 hour') ? 1 : 2;

    const forecast = await getForecast(interval);
    bot.sendMessage(chatId, forecast);
})

async function getForecast(interval) {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=46.4843023&lon=30.7322878&units=metric&exclude=hourly&appid=${apiKey}`);
    const data = res.data;

    const weatherForecast = [];

    for(let i = 0; i < data.list.length; i = i+interval) {
        let forecast = {
            "day": new Date(data.list[i].dt * 1000).toLocaleDateString('en-US', { weekday: "long" }),
            "date": new Date(data.list[i].dt * 1000).toLocaleDateString('ru-RU'),
            "time": new Date(data.list[i].dt * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            "temp": Math.round(data.list[i].main.temp),
            "feels_like": Math.round(data.list[i].main.feels_like),
            "description": data.list[i].weather[0].main
        }
        weatherForecast.push(forecast);
    }
    let weather = 'Weather in Odessa: \n';
    for(let i = 0; i < weatherForecast.length; i++) {
        if(i === 0 || weatherForecast[i].day !== weatherForecast[i - 1].day) {
            weather += `${weatherForecast[i].day}  ${weatherForecast[i].date}\n${weatherForecast[i].time} Temperature: ${weatherForecast[i].temp}°C, feels like: ${weatherForecast[i].feels_like}°C, ${weatherForecast[i].description}\n`;
        }
        else {
            weather += `${weatherForecast[i].time} Temperature: ${weatherForecast[i].temp}°C, feels like: ${weatherForecast[i].feels_like}°C, ${weatherForecast[i].description}\n`;
        }
    }

    return weather;
}