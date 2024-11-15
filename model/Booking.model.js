const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    staffId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    bookingStartTime: {
      type: String,
      required: true,
    },
    bookingEndTime: {
      type: String,
      required: true,
    },
    business: {
      type: String,
      required: true,
    },
    services: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const BookingModel = mongoose.model("booking", BookingSchema);

module.exports = BookingModel;
