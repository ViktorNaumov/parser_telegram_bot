const puppeteer = require("puppeteer");

exports.GetData = (callback) => {
  (async () => {
    let browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      devtools: true,
    });
    try {
      let page = await browser.newPage();
      await page.setViewport({
        width: 1400,
        height: 900,
      });
      await page.goto("https://investfuture.ru/markets/quotes");

      await page.waitForSelector("div.col-md-12");

      let html = await page.evaluate(async () => {
        let page = [];
        try {
          let divs0 = document.querySelector("#result_panel");
          let divs = divs0.querySelector("section +div +section +div >table");
          let divs1 = divs.querySelectorAll("tbody > tr");

          divs1.forEach((div) => {
            let name = div.querySelector("td > a");

            let value = div.querySelector("td+td+td");

            let persent = div.querySelector("td+td+td+td+td+td+td");

            let obj = {
              name: name.innerText,
              value: value.innerText,
              persent: persent.innerText,
            };
            page.push(obj);
          });
        } catch (e) {
          console.log(e);
        }
        return page;
      });
      // console.log(html);
      browser.close();
      callback(html);
    } catch (e) {
      console.log(e);
      browser.close();
    }
  })();
};
