const BookingModel = require("../model/Booking.model");
const {
  bookingCreationGuard,
  bookingDeletionGuard,
  bookingReadAllGuard,
} = require("../middleware/booking.middleware");

const BookingRouter = require("express").Router();

// post-method
BookingRouter.post("/create", bookingCreationGuard, async (req, res) => {
  const booking = new BookingModel(req.body);
  booking
    .save()
    .then((result) => {
      if (result && result._id) {
        return res.status(201).json({
          message: "Booking  create successful",
        });
      } else {
        return res.status(500).json({
          message: "something went wrong",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
        message: "Bad req",
      });
    });
});
// get-method
// get all  the bookings
BookingRouter.get("/", bookingReadAllGuard, async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    if (bookings && bookings.length > 0) {
      return res.status(200).json({
        message: "All bookings fetched successfully",
        data: bookings,
      });
    } else {
      return res.status(200).json({
        message: "No bookings found",
        data: [],
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: "something went wrong",
    });
  }
});

// method=get
// get all booking one userId
BookingRouter.get(
  "/userBooking/:userId",
  bookingReadAllGuard,
  async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        message: "User id is missing the req",
      });
    }

    try {
      const bookings = await BookingModel.find({ userId });
      if (bookings && bookings.length > 0) {
        return res.status(200).json({
          message: "All bookings fetched successfully",
          data: bookings,
        });
      } else {
        return res.status(200).json({
          message: "No bookings found",
          data: [],
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message,
        message: "something went wrong",
      });
    }
  }
);
// method=get
// get a booking for userId
BookingRouter.get(
  "/userBooking/:userId/:bookingId",
  bookingReadAllGuard,
  async (req, res) => {
    const { userId, bookingId } = req.params;
    if (!bookingId) {
      return res.status(400).json({
        message: "User id is missing the req",
      });
    }

    try {
      const booking = await BookingModel.find({
        userId,
        _id: bookingId,
      });
      if (bookings && booking._id) {
        return res.status(200).json({
          message: " booking fetched successfully",
          data: booking,
        });
      } else {
        return res.status(200).json({
          message: "No booking found",
          data: [],
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message,
        message: "something went wrong",
      });
    }
  }
);

// method=delete
// delete a booking
BookingRouter.delete(
  "/delete/:bookingId",
  bookingDeletionGuard,
  async (req, res) => {
    const { bookingId } = req.params;
    if (!bookingId) {
      return res.status(200).json({
        message: "Booking id is missing the req",
      });
    }
    try {
      const result = await BookingModel.findByIdAndDelete({ _id: bookingId });
      // console.log(res);
      if (result) {
        return res.status(200).json({
          message: "Booking  deleted",
          bookingId: result._id,
        });
      } else {
        return res.status(410).json({
          message: "req resource is not available",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message,
        message: "something went wrong",
      });
    }
  }
);

module.exports = BookingRouter;
