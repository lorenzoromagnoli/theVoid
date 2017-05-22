// CODE FOR SERVER

var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.send("Hello World");
});

app.put("/score", function(req, res){
  console.log(req);
})


var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});



//CODE FOR THE BOT

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '386674205:AAHVM5SohpgQF8vrhf1050tnnbtMkmpc4Cc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

var gameLink="https://lorenzoromagnoli.github.io/theVoid/";

console.log("bot started");

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;

  if (msg.game){
    console.log("pigliati sto gioco" + msg.game.title);
      bot.sendMessage(chatId, 'https://automato-build.github.io/Playfully-Connected-Things/ble-example/');
  }

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 't.me/theVoid_bot?game=theVoid');
});

bot.on("callback_query", function(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, gameLink, true, {url: gameLink});
  console.log(callbackQuery);
});
