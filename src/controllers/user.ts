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

usersController.get(":id", async (req: Request<{ id: number }>, res: Response) => {
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
  // Save a user
});

usersController.put("/:id", async (req: Request<{ id: number }, {}, User>, res: Response) => {
  // Update a user by id
});

usersController.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  // Delete a user by id
});

export default usersController;
