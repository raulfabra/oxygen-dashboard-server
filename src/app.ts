import { loginController } from "./controllers/login";
import { bookingsController } from "./controllers/booking";
import roomsController from "./controllers/room";
import express from "express";

export const app = express();

// public routes
app.use("/login", loginController);

// private routes
app.use("/booking", bookingsController);

app.use("/rooms", roomsController);
