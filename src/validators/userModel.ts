import mongoose from "mongoose";
import { Status } from "../interfaces/User";

interface UserSchemaInterface extends Document {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  jobDesk: string;
  startDate: Date;
  picture: string;
  status: Status;
}

const UserSchema = new mongoose.Schema<UserSchemaInterface>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: true,
  },
  jobDesk: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
