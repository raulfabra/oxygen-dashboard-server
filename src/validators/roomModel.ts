import mongoose from "mongoose";
import { TypeRoomBed, Status } from "../interfaces/Room";

export interface RoomSchemaInterface extends Document {
  id: number;
  typeRoom_bed: TypeRoomBed;
  description: string;
  facilities: string;
  pictures: string;
  numberRoom: number;
  priceNight: number;
  isOffer: boolean;
  discount: number;
  status: Status;
  cancellation: string;
}

const RoomSchema = new mongoose.Schema<RoomSchemaInterface>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  typeRoom_bed: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  facilities: {
    type: String,
    required: true,
  },
  pictures: {
    type: String,
    required: true,
  },
  numberRoom: {
    type: Number,
    required: true,
  },
  priceNight: {
    type: Number,
    required: true,
  },
  isOffer: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
    default: 0,
  },
  status: {
    type: String,
    required: true,
  },
  cancellation: {
    type: String,
    required: true,
  },
});

const RoomModel = mongoose.model("Room", RoomSchema);

export default RoomModel;
