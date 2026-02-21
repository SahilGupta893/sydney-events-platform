require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const scrapeTimeOut = require("./scrapers/timeOutScraper");
const cron = require("node-cron");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/TicketRoutes");
const session = require("express-session");
const passport = require("passport");
const scrapeEventbrite = require("./scrapers/eventbriteScraper");
const runScraper = require("./scrapers/sydneyScraper");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Run once when server starts
scrapeTimeOut();
scrapeEventbrite();

// Run every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running scheduled scrape...");
  await scrapeTimeOut();
  await scrapeEventbrite();
  await runScraper();
});

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/events", eventRoutes);

app.use("/api/tickets", ticketRoutes);

app.use(session({
  secret: "supersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,     // IMPORTANT: must be false in localhost
    sameSite: "lax"    // IMPORTANT
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Sydney Events API Running");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
