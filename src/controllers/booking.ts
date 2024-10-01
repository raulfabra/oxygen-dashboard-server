import { Request, Response, Router } from "express";
import { Booking } from "../interfaces/Booking";

export const bookingsController = Router();

bookingsController.get("/", async (req: Request, res: Response) => {
  // Get all bookings
  res.send("Got a GET request at /booking");
});

bookingsController.get(":id", async (req: Request<{ id: number }>, res: Response) => {
  // Get a booking by id
  res.send("Got a GET request at /booking/id");
});

bookingsController.post("/", async (req: Request<{}, {}, Booking>, res: Response) => {
  // Save a booking
  res.send("Got a POST request at /booking");
});

bookingsController.put("/:id", async (req: Request<{ id: number }, {}, Booking>, res: Response) => {
  // Update a booking by id
  res.send("Got a PUT request at /booking");
});

bookingsController.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  // Delete a booking by id
  res.send("Got a DELETE request at /booking");
});
