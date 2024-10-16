import { Request, Response, Router } from "express";
import { User } from "../interfaces/User";
import UserModel from "../validators/userModel";
import usersData from "../data/dataUsers.json";

const usersController = Router();

usersController.get("/", async (req: Request, res: Response) => {
  try {
    const allUsers = await UserModel.find();

    if (!allUsers || allUsers.length === 0) {
      res.status(404).json({ message: "No rooms found" });
    }
    // Si hay datos, los retornamos con un código 200 (OK)
    res.status(200).json(allUsers);
  } catch (error: any) {
    // En caso de error, retornamos una respuesta 500 (Internal Server Error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

usersController.get("/:id", async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
});

usersController.post("/", async (req: Request<{}, {}, User>, res: Response) => {
  try {
    const { body } = req;

    const newUser = new UserModel(body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

usersController.put("/:id", async (req: Request<{ id: number }, {}, User>, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updatedUser = UserModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
});

usersController.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default usersController;
