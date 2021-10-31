const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  organizer: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  numOfSeats: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("event", EventSchema);

// for module.schema we would need a cluster from mongoDB
