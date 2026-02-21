const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const requireAuth = require("../middleware/requireAuth");

// GET all events (with filters)
router.get("/", async (req, res) => {
  try {
    const { city, keyword, startDate, endDate, status } = req.query;

    let query = {};

    if (city) query.city = city;

    if (status) query.status = status;

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { venueName: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ];
    }

    if (startDate && endDate) {
      query.dateTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const events = await Event.find(query).sort({ lastScrapedAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.put("/import/:id", async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const event = await Event.findById(req.params.id);

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     event.status = "imported";
//     event.importedAt = new Date();
//     event.importedBy = req.user._id;
//     event.importNotes = req.body.notes || "";

//     await event.save();

//     res.json({ success: true, event });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.put("/import/:id", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const event = await Event.findById(req.params.id);

    event.status = "imported";
    event.importedAt = new Date();
    event.importedBy = req.user._id;

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;