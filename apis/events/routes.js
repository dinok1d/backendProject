const express = require("express");

const {
  fetchEventList,
  eventDetail,
  createEvent,
  eventBooked,
  eventUpdate,
  eventDelete,
} = require("./controllers");

const router = express.Router();

router.get("/", fetchEventList); // creating a fetchlist

router.get("/:eventId", eventDetail); // fetching a detailed event

router.post("/", createEvent); // creating a create event

router.post("/booked", eventBooked); // to see the booked Events -(note to remember, you will only see the fully
// booked events if you write the path/booked in the link

router.put("/:eventId", eventUpdate); // creating a update

router.delete("/:eventId", eventDelete); //creating a delete link

module.exports = router; // we are exporting router
