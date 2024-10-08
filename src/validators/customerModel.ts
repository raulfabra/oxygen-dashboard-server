import mongoose from "mongoose";
import { Status } from "../interfaces/Customer";

interface CustomerSchemaInterface extends Document {
  id: number;
  date: Date;
  fullName: string;
  email: string;
  phone: string;
  score: number;
  comment: string;
  issue: string;
  status: Status;
}

const CustomerSchema = new mongoose.Schema<CustomerSchemaInterface>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
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
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
