import { Request, Response, Router } from "express";
import authService from "../services/login";

const loginController = Router();

loginController.post("/", async (req: Request<{}, {}, { userId: number; pass: string; email: string }>, res: Response) => {
  // Return jwt token if the username and password are correct

  // ...

  const token = authService.signJWT(req.body);
  res.json(token);

  // ...
});

export default loginController;
