import { Request, Response, Router } from "express";
import authService from "../services/login";

const loginController = Router();

loginController.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Hacer match de credenciales del user con la base de datos
    const payload = await authService.login(email, password);

    if (payload?.success) {
      // Crear el token
      const token = authService.signJWT(payload.user!);

      // Devolvemos el Token en JSON
      res.json({ token });
    } else {
      res.status(400).json({ message: payload?.message });
    }
  } catch (error) {
    console.log(error);
  }
});

export default loginController;
