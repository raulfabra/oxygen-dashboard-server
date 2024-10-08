import { Request, Response, Router } from "express";
import { Room } from "../interfaces/Room";
import RoomModel from "../validators/roomModel";
import roomsData from "../data/dataRooms.json";

const roomsController = Router();

roomsController.get("/", async (req: Request, res: Response) => {
  try {
    const allRooms = await RoomModel.find();

    if (!allRooms || allRooms.length === 0) {
      res.status(404).json({ message: "No rooms found" });
    }
    // Si hay datos, los retornamos con un código 200 (OK)
    res.status(200).json(allRooms);
  } catch (error: any) {
    // En caso de error, retornamos una respuesta 500 (Internal Server Error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

roomsController.get("/:id", async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.params;

    // Buscamos la habitación por su id
    const room = await RoomModel.findById(id);

    if (!room) res.status(404).json({ message: "Room not found" });

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving room" });
  }
});

roomsController.post("/", async (req: Request<Room>, res: Response) => {
  try {
    const { body } = req;

    const newRoom = new RoomModel(body);
    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating room" });
  }
});

roomsController.put("/:id", async (req: Request<{ id: number }, {}, Room>, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // Actualizamos la Room
    const updatedRoom = RoomModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRoom) {
      res.status(404).json({ message: "Room not found" });
    }

    res.json(updatedRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating room" });
  }
});

roomsController.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRoom = await RoomModel.findByIdAndDelete(id);

    if (!deletedRoom) {
      res.status(404).json({ message: "Room not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting room" });
  }
});

export default roomsController;
