const express = require("express");
const router = express.Router();
const { auth, authorize } = require("../middleware/auth");
const Registration = require("../models/Registration");
const Event = require("../models/Event");

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

router.post(
  "/",
  auth,
  authorize("student"),
  async (req, res) => {
    try {
      const studentId = req.user.userId;
      const { eventId } = req.body;

      if (!eventId) {
        return res.status(400).json({
          message: "Event ID is required"
        });
      }

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      const existingRegistration = await Registration.findOne({
        studentId,
        eventId
      });

      if (existingRegistration) {
        return res.status(400).json({
          message: "Already registered for this event"
        });
      }

      const registeredCount = await Registration.countDocuments({
        eventId
      });

      if (registeredCount >= event.capacity) {
        return res.status(400).json({
          message: "Event full"
        });
      }

      const registration = new Registration({
        studentId,
        eventId
      });

      const savedRegistration = await registration.save();
      res.status(201).json(savedRegistration);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

router.get(
  "/event/:eventId",
  auth,
  authorize("admin"),
  async (req, res) => {
    try {
      const registrations = await Registration.find({
        eventId: req.params.eventId
      }).populate("studentId");

      res.json(registrations);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

router.get(
  "/student/:studentId",
  auth,
  authorize("student", "admin"),
  async (req, res) => {
    try {
      if (
        req.user.role === "student" &&
        req.user.userId !== req.params.studentId
      ) {
        return res.status(403).json({
          message: "Forbidden: cannot access another student's registrations"
        });
      }

      const registrations = await Registration.find({
        studentId: req.params.studentId
      }).populate("eventId");

      res.json(registrations);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;