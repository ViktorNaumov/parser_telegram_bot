const TelegramBot = require("node-telegram-bot-api");
const key = require("./key");
const app = require("./app");
let Get = require("./state");

const bot = new TelegramBot(key.token, {
  polling: true,
});

let state = Get.state;
let flag = false;

setInterval(app.Get, 7000);

let messid;
let chatid;
let timerId2;

bot.on("message", (msg) => {
  console.log(msg);

  switch (msg.text) {
    case "index":
      if (flag == false) {
        flag = true;
        bot
          .sendMessage(
            msg.chat.id,
            "S&P 500:     " +
              state.SNP500.value +
              " " +
              state.SNP500.persent +
              "\n" +
              "--------------------------------------\n" +
              "NASDAQ:      " +
              state.NASDAQ.value +
              " " +
              state.NASDAQ.persent +
              "\n" +
              "--------------------------------------\n" +
              "RUSSELL:     " +
              state.RUSSEL.value +
              " " +
              state.RUSSEL.persent +
              "\n" +
              "--------------------------------------\n" +
              "EUROSTOXX50: " +
              state.EUROSTOXX50.value +
              " " +
              state.EUROSTOXX50.persent
          )

          .then((e) => {
            //   console.log(e)
            messid = e.message_id;
            chatid = e.chat.id;
            timerId2 = setInterval(() => {
              if (state.SNP500.value !== null) {
                try {
                  bot.editMessageText(
                    "S&P 500:               " +
                      state.SNP500.value +
                      "   " +
                      state.SNP500.persent +
                      "\n" +
                      "--------------------------------------\n" +
                      "NASDAQ:             " +
                      state.NASDAQ.value +
                      "   " +
                      state.NASDAQ.persent +
                      "\n" +
                      "--------------------------------------\n" +
                      "RUSSELL:              " +
                      state.RUSSEL.value +
                      "   " +
                      state.RUSSEL.persent +
                      "\n" +
                      "--------------------------------------\n" +
                      "EUROSTOXX50:  " +
                      state.EUROSTOXX50.value +
                      "   " +
                      state.EUROSTOXX50.persent,
                    {
                      chat_id: chatid,
                      message_id: messid,
                    }
                  );
                } catch (err) {
                  console.log("без изменений");
                }
              }
            }, 10000);
          });
        bot.sendMessage(msg.chat.id, "Нажми STOP чтобы закончить", {
          reply_markup: {
            inline_keyboard: [[{ text: "STOP", callback_data: `stop` }]],
          },
        });
      }

      break;
    case "/start":
      bot.sendMessage(msg.chat.id, "hello beach");
      break;
    case "жопа":
      bot.sendMessage(msg.chat.id, "Ты жопа");
    default:
  }
});

bot.on("callback_query", (query) => {
  switch (query.data) {
    case "stop":
      bot.deleteMessage(chatid, messid);
      bot.deleteMessage(chatid, query.message.message_id);
      clearInterval(timerId2);
      flag = false;
      messid = null;
      chatid = null;
  }
});
