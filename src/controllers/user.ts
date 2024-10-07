import { Request, Response, Router } from "express";
import { User } from "../interfaces/User";
import usersData from "../data/dataUsers.json";

const usersController = Router();

usersController.get("/", async (req: Request, res: Response) => {
  try {
    if (!usersData || usersData.length === 0) {
      res.status(404).json({ message: "No rooms found" });
    }
    // Si hay datos, los retornamos con un código 200 (OK)
    res.status(200).json(usersData);
  } catch (error: any) {
    // En caso de error, retornamos una respuesta 500 (Internal Server Error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

usersController.get("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;

  // Buscamos la habitación por su id
  const user = usersData.find((user) => user.id === Number(id));

  if (!user) {
    res.status(404).json({ message: "Room not found" });
  } else {
    res.status(200).json(user);
  }
});

usersController.post("/", async (req: Request<{}, {}, User>, res: Response) => {
  const { body } = req;

  // Obtener todos los ids de roomsData y calcular el máximo
  const ids = usersData.map((user) => user["id"]);
  const maxId = Math.max(...ids);

  // Crear un nuevo room con un id incrementado
  const newUser = { ...body, id: maxId + 1, startDate: body.startDate.toDateString() };

  // Agregar la nueva habitación a roomsData
  usersData.push(newUser);

  // Enviar la respuesta con el nuevo array
  res.status(201).json([...usersData, newUser]);
});

usersController.put("/:id", async (req: Request<{ id: number }, {}, User>, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  // Encontramos el índice de la booking por su id
  const userByIndex = usersData.findIndex((user) => user["id"] === Number(id));

  // Si encontramos la booking, la actualizamos
  if (userByIndex !== -1) {
    const updatedUser = {
      ...usersData[userByIndex],
      ...body,
      startDate: body.startDate.toDateString(),
    };

    // Actualizamos el array de bookings con el objeto actualizado
    usersData[userByIndex] = updatedUser;

    // Enviamos la respuesta con la booking actualizada
    res.status(200).json(updatedUser);
  }

  // Si no encontramos la booking, enviamos una respuesta 404
  res.status(404).json({ message: "booking not found" });
});

usersController.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const { id } = req.params;

  // Encontramos el índice de la booking por su id
  const userByIndex = usersData.findIndex((user) => user["id"] === Number(id));

  // Si la booking existe, la eliminamos
  if (userByIndex !== -1) {
    // Eliminamos la booking del array
    const deletedUser = usersData.splice(userByIndex, 1); // splice devuelve un array con los elementos eliminados

    res.status(200).json({ message: "booking deleted successfully", deletedUser });
  }

  // Si no encontramos la booking, enviamos una respuesta 404
  res.status(404).json({ message: "booking not found" });
});

export default usersController;
