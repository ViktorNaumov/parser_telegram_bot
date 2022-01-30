const Parser = require("./parser");
let StateObject = require("./state");

let state = StateObject.state;

exports.Get = async () => {
  console.log("запрос");
  Parser.GetData((obj) => {
    for (let i = 0; i < obj.length; i++) {
      switch (obj[i].name) {
        case "S&P 500":
          state.SNP500.value = obj[i].value;
          state.SNP500.persent = obj[i].persent;
          break;
        case "NASDAQ Composite":
          state.NASDAQ.value = obj[i].value;
          state.NASDAQ.persent = obj[i].persent;
          break;
        case "Russell 2000":
          state.RUSSEL.value = obj[i].value;
          state.RUSSEL.persent = obj[i].persent;
          break;
        case "Euro Stoxx 50":
          state.EUROSTOXX50.value = obj[i].value;
          state.EUROSTOXX50.persent = obj[i].persent;
          break;
      }
    }
    console.log(state);
  });
};

// setInterval(Get, 3000);
// let timerId = setInterval(Get, 3000);