const puppeteer = require("puppeteer");
const Event = require("../models/Event");

const scrapeEventbrite = async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto("https://www.eventbrite.com.au/d/australia--sydney/events/", {
      waitUntil: "networkidle2"
    });

    const events = await page.evaluate(() => {
      const cards = document.querySelectorAll("article");
      const data = [];

      cards.forEach(card => {
        const title = card.querySelector("h3")?.innerText;
        const link = card.querySelector("a")?.href;
        const image = card.querySelector("img")?.src;

        if (title && link) {
          data.push({ title, link, image });
        }
      });

      return data;
    });

    await browser.close();

    for (let item of events) {
      const existing = await Event.findOne({ originalUrl: item.link });

      if (!existing) {
        await Event.create({
          title: item.title,
          city: "Sydney",
          sourceWebsite: "Eventbrite",
          originalUrl: item.link,
          imageUrl: item.image,
          status: "new",
          lastScrapedAt: new Date()
        });
      }
    }

  } catch (error) {
    console.error(error);
  }
};

module.exports = scrapeEventbrite;