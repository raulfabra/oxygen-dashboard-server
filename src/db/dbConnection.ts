import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const uri = process.env.dbURI || "";

export async function dbConnection() {
  try {
    await mongoose.connect(uri);
    console.log("Connected correctly to server");
  } catch (err: any) {
    console.log(err.stack);
    await mongoose.disconnect();
  }
}
