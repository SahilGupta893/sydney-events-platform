const express = require("express");
const router = express.Router();
const TicketClick = require("../models/TicketClick");

router.post("/", async (req, res) => {
  try {
    const { email, consent, eventId } = req.body;

    if (!email || !consent) {
      return res.status(400).json({ message: "Email & consent required" });
    }

    const ticket = await TicketClick.create({
      email,
      consent,
      eventId
    });

    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;