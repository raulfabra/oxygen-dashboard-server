import mongoose from "mongoose";
import { RoomType, Status } from "../interfaces/Booking";

interface BookingSchemaInterface extends Document {
  id: number;
  fullName: string;
  orderDate: Date;
  checkin: Date;
  checkout: Date;
  request: string;
  roomType: RoomType;
  roomNumber: number;
  status: Status;
}

const BookingSchema = new mongoose.Schema<BookingSchemaInterface>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  checkin: {
    type: Date,
    required: true,
  },
  checkout: {
    type: Date,
    required: true,
  },
  request: {
    type: String,
    required: false,
  },
  roomType: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const BookingModal = mongoose.model("Booking", BookingSchema);
export default BookingModal;
