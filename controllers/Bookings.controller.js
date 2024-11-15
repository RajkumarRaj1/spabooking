const BookingModel = require("../model/Booking.model");
const {
  bookingCreationGuard,
  bookingDeletionGuard,
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
BookingRouter.get("/", async (req, res) => {});

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
