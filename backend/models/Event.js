const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  dateTime: Date,
  venueName: String,
  venueAddress: String,
  city: { type: String, default: "Sydney" },
  description: String,
  category: [String],
  imageUrl: String,
  sourceWebsite: String,
  originalUrl: { type: String, unique: true },
  status: {
    type: String,
    enum: ["new", "updated", "inactive", "imported"],
    default: "new"
  },
  lastScrapedAt: Date,
  importedAt: Date,
  importedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  importNotes: String
});

module.exports = mongoose.model("Event", EventSchema);