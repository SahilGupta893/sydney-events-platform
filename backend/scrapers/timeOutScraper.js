const puppeteer = require("puppeteer");
const Event = require("../models/Event");

const scrapeTimeOut = async () => {
  try {
    console.log("Launching browser...");

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto("https://www.timeout.com/sydney/things-to-do", {
      waitUntil: "networkidle2",
    });

    console.log("Page loaded...");

    // Extract events from rendered DOM
    const events = await page.evaluate(() => {
      const eventCards = document.querySelectorAll("article");
      const data = [];

      eventCards.forEach((card) => {
        const title = card.querySelector("h3")?.innerText;
        const description = card.querySelector("p")?.innerText;
        const link = card.querySelector("a")?.href;
        const image = card.querySelector("img")?.src;

        if (title && link) {
          data.push({
            title,
            description,
            link,
            image,
          });
        }
      });

      return data;
    });

    await browser.close();

    console.log(`Found ${events.length} events`);

    const scrapedUrls = [];

    for (let item of events) {
      scrapedUrls.push(item.link);

      const existingEvent = await Event.findOne({ originalUrl: item.link });

      if (!existingEvent) {
        await Event.create({
          title: item.title,
          description: item.description,
          city: "Sydney",
          sourceWebsite: "TimeOut",
          originalUrl: item.link,
          imageUrl: item.image,
          lastScrapedAt: new Date(),
          status: "new",
        });
      } else {
        if (
          existingEvent.title !== item.title ||
          existingEvent.description !== item.description ||
          existingEvent.dateTime?.toString() !== item.dateTime?.toString()
        ) {
          existingEvent.title = item.title;
          existingEvent.description = item.description;
          existingEvent.dateTime = item.dateTime;
          existingEvent.status = "updated";
          existingEvent.lastScrapedAt = new Date();
          await existingEvent.save();
        }
      }
    }

    // Mark inactive
    const allEvents = await Event.find({ sourceWebsite: "TimeOut" });

    for (let event of allEvents) {
      if (!scrapedUrls.includes(event.originalUrl)) {
        event.status = "inactive";
        await event.save();
      }
    }

    console.log("Scrape completed successfully.");
  } catch (error) {
    console.error("Scraper error:", error.message);
  }
};

module.exports = scrapeTimeOut;
