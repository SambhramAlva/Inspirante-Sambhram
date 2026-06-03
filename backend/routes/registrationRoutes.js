const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");

router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const registration =
      new Registration(req.body);

    const savedRegistration =
      await registration.save();

    res.status(201).json(savedRegistration);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/event/:eventId", async (req, res) => {
  try {
    const registrations =
      await Registration.find({
        eventId: req.params.eventId
      }).populate("studentId");

    res.json(registrations);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/student/:studentId", async (req, res) => {
  try {
    const registrations =
      await Registration.find({
        studentId: req.params.studentId
      }).populate("eventId");

    res.json(registrations);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;