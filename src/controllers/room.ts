import { Request, Response, Router } from "express";
import { Room } from "../interfaces/Room";
import roomsData from "../data/dataRooms.json";

const roomsController = Router();

roomsController.get("/", async (req: Request, res: Response) => {
  try {
    if (!roomsData || roomsData.length === 0) {
      res.status(404).json({ message: "No rooms found" });
    }
    // Si hay datos, los retornamos con un código 200 (OK)
    res.status(200).json(roomsData);
  } catch (error: any) {
    // En caso de error, retornamos una respuesta 500 (Internal Server Error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

roomsController.get("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;

  // Buscamos la habitación por su id
  const room = roomsData.find((room) => room["id"] === Number(id));

  if (!room) {
    res.status(404).json({ message: "Room not found" });
  } else {
    res.status(200).json(room);
  }
});

roomsController.post("/", async (req: Request<Room>, res: Response) => {
  const { body } = req;

  // Obtener todos los ids de roomsData y calcular el máximo
  const ids = roomsData.map((room) => room["id"]);
  const maxId = Math.max(...ids);

  // Crear un nuevo room con un id incrementado
  const newRoom = { ...body, id: maxId + 1 };

  // Agregar la nueva habitación a roomsData
  roomsData.push(newRoom);

  // Enviar la respuesta con el nuevo array
  res.status(201).json([...roomsData, newRoom]);
});

roomsController.put("/:id", async (req: Request<{ id: number }, {}, Room>, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  // Encontramos el índice de la room por su id
  const roomByIndex = roomsData.findIndex((room) => room["id"] === Number(id));

  // Si encontramos la room, la actualizamos
  if (roomByIndex !== -1) {
    const updatedRoom = { ...roomsData[roomByIndex], ...body };

    // Actualizamos el array de rooms con el objeto actualizado
    roomsData[roomByIndex] = updatedRoom;

    // Enviamos la respuesta con la room actualizada
    res.status(200).json(updatedRoom);
  }

  // Si no encontramos la room, enviamos una respuesta 404
  res.status(404).json({ message: "Room not found" });
});

roomsController.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;

  // Encontramos el índice de la room por su id
  const roomByIndex = roomsData.findIndex((room) => room["id"] === Number(id));

  // Si la room existe, la eliminamos
  if (roomByIndex !== -1) {
    // Eliminamos la room del array
    const deletedRoom = roomsData.splice(roomByIndex, 1); // splice devuelve un array con los elementos eliminados

    res.status(200).json({ message: "Room deleted successfully", deletedRoom });
  }

  // Si no encontramos la room, enviamos una respuesta 404
  res.status(404).json({ message: "Room not found" });
});

export default roomsController;
