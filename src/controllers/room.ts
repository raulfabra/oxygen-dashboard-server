import { Request, Response, Router } from "express";
import { Room } from "../interfaces/Booking";
import roomsData from "../data/dataRooms.json";

export const roomsController = Router();

roomsController.get("/", async (req: Request, res: Response) => {
  // Get all rooms
});

roomsController.get(":id", async (req: Request<{ id: number }>, res: Response) => {
  // Get a rooms by id
});

roomsController.post("/", async (req: Request<{}, {}, Room>, res: Response) => {
  // Save a rooms
});

roomsController.put("/:id", async (req: Request<{ id: number }, {}, Room>, res: Response) => {
  // Update a rooms by id
});

roomsController.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  // Delete a rooms by id
});
