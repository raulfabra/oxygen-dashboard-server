import infoController from "./controllers/info";
import loginController from "./controllers/login";
import bookingsController from "./controllers/booking";
import roomsController from "./controllers/room";
import customersController from "./controllers/customer";
import usersController from "./controllers/user";

import express from "express";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(cors());

// public routes
app.use("/", infoController);

app.use("/login", loginController);

// private routes
app.use("/booking", bookingsController);

app.use("/room", roomsController);

app.use("/user", usersController);

app.use("/customer", customersController);
