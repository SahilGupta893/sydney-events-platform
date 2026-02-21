const Event = require("../models/Event");

async function saveOrUpdateEvent(scrapedEvent) {

  const existingEvent = await Event.findOne({
    originalUrl: scrapedEvent.originalUrl
  });

  if (!existingEvent) {
    // NEW EVENT
    await Event.create({
      ...scrapedEvent,
      status: "new",
      lastScrapedAt: new Date()
    });

    console.log("New event added:", scrapedEvent.title);
  } else {

    // CHECK IF UPDATED
    const isChanged =
      existingEvent.dateTime?.toString() !== scrapedEvent.dateTime?.toString() ||
      existingEvent.venueName !== scrapedEvent.venueName ||
      existingEvent.description !== scrapedEvent.description ||
      existingEvent.imageUrl !== scrapedEvent.imageUrl;

    if (isChanged) {
      existingEvent.dateTime = scrapedEvent.dateTime;
      existingEvent.venueName = scrapedEvent.venueName;
      existingEvent.description = scrapedEvent.description;
      existingEvent.imageUrl = scrapedEvent.imageUrl;
      existingEvent.status = "updated";
      existingEvent.lastScrapedAt = new Date();

      await existingEvent.save();

      console.log("Updated event:", scrapedEvent.title);
    } else {
      // Just refresh scrape timestamp
      existingEvent.lastScrapedAt = new Date();
      await existingEvent.save();
    }
  }
}

const runScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://example.com");

  const scrapedEvents = await page.evaluate(() => {
    // return array of events
  });

  await browser.close();

  // 🔥 THIS IS WHERE YOU ADD IT
  for (const event of scrapedEvents) {
    await saveOrUpdateEvent(event);
  }

  // 🔥 AFTER THAT — mark inactive events
  const scrapedUrls = scrapedEvents.map(e => e.originalUrl);

  await Event.updateMany(
    { originalUrl: { $nin: scrapedUrls } },
    { status: "inactive" }
  );

  console.log("Scraping completed");
};

module.exports = runScraper;