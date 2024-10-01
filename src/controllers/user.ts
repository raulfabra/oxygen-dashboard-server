import { Request, Response, Router } from "express";
import { User } from "../interfaces/User";

export const usersController = Router();

usersController.get("/", async (req: Request, res: Response) => {
  // Get all users
  res.send("Got a GET request at /user");
});

usersController.get(":id", async (req: Request<{ id: number }>, res: Response) => {
  // Get a user by id
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
