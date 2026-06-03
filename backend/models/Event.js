const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  date: {
    type: Date,
    required: true
  },

  venue: {
    type: String,
    required: true,
    trim: true
  },

  capacity: {
    type: Number,
    required: true
  }
});

/*
 Prevent duplicate events having the same:
 Name + Date + Venue
*/
eventSchema.index(
  {
    name: 1,
    date: 1,
    venue: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model(
  "Event",
  eventSchema
);