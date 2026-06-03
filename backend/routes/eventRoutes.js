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

      const {
        name,
        date,
        venue,
        capacity
      } = req.body;

      const existingEvent =
        await Event.findOne({
          name: name.trim(),
          date,
          venue: venue.trim()
        });

      if (existingEvent) {

        return res.status(400).json({
          message:
            "An event with the same name, date and venue already exists."
        });

      }

      const event = new Event({
        name: name.trim(),
        date,
        venue: venue.trim(),
        capacity
      });

      const savedEvent =
        await event.save();

      res.status(201).json(savedEvent);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to create event"
      });

    }

  }
);

module.exports = router;