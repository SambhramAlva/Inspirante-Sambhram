const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { auth, authorize } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post(
  "/",
  auth,
  authorize("admin"),
  async (req, res) => {
    try {
      const event = new Event(req.body);
      const savedEvent = await event.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;