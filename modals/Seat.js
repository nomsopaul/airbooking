import mongoose from 'mongoose';
const SeatSchema = new mongoose.Schema (
  {
    seatType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    seatNumbers: [{ number: Number, unavailableDates: { type: [Date]}}],
  },
  {timestamps: true}
);

export default mongoose.model ('Seat', SeatSchema);
