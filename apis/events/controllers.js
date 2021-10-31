const event = require("../events/models/Event");

//things to remember that for every call to the backend, we need to put a statuscode.
// fetching => is (200)
// creating => is (201)
// updating => is (200)
// deleting => is (204)

//Fetch
exports.fetchEventList = async (req, res, next) => {
  try {
    const events = await event.find();
    return res.json(events);
  } catch (error) {
    next(error);
  }
};

//-----------------------------------------------------------------------------------------------------
//Create
exports.createEvent = async (req, res, next) => {
  try {
    const newEvent = await event.create(req.body); // we would have to go to postman,body,raw ,json
    return res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

//-----------------------------------------------------------------------------------------------------
//Detail Event

exports.eventDetail = async (req, res, next) => {
  try {
    const detailedEvent = await event.findById(req.params.eventId); // req.params.id will have the ID of my query
    if (detailedEvent) {
      // if detailedEvent exists do this
      return res.json(detailedEvent); // return to me a res.json of the detailed event
    } else {
      const errorMsg = {
        status: 404,
        message: "Event not found!",
      };
      next(errorMsg);
    }
  } catch (error) {
    const errorMsg = {
      status: 404,
      message: "Event not found!",
    };
    next(error);
  }
};
//-----------------------------------------------------------------------------------------------------
// event booked

exports.eventBooked = async (req, res, next) => {
  try {
    const fullyBooked = await event.find({
      $expr: { $eq: ["$numOfSeats", "$bookedSeats"] },
    });
    return res.json(fullyBooked);
  } catch (error) {
    next(error);
  }
};

//-----------------------------------------------------------------------------------------------------
// Update

exports.eventUpdate = async (req, res, next) => {
  const { eventId } = req.params;
  console.log("this is the event id ", eventId);

  try {
    const updateEvent = await event.findByIdAndUpdate(
      { _id: eventId },
      req.body,
      { new: true, runValidators: true }
    ); // new:true will give me the lastest update as a response
    // run validators will run the validators i have on the event update.
    if (updateEvent) {
      return res.json(updateEvent);
    } else {
      const ErrorMsg = {
        status: 404,
        message: "event not found!",
      };
      next(ErrorMsg);
    }
  } catch {
    const ErrorMsg = {
      status: 404,
      message: "Product not found!",
    };
    next(ErrorMsg);
  }
};
//-----------------------------------------------------------------------------------------------------

exports.eventDelete = async (req, res, next) => {
  try {
    const eventId = await event.findById(req.params.eventId);
    if (eventId) {
      await eventId.remove();
      return res.status(204).end();
    } else {
      const ErrorMsg = {
        status: 404,
        message: "event not found!",
      };
      next(ErrorMsg);
    }
  } catch (error) {
    const ErrorMsg = {
      status: 404,
      message: "event not found!",
    };
    next(ErrorMsg);
  }
};
