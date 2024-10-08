import { app } from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;
const dbURI = process.env.dbURI || "mongodb://127.0.0.1:27017/hotel";

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
//db connection
/* mongoose
  .connect(dbURI)
  .then((result) => app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`)))
  .catch((err) => console.log(err)); */
