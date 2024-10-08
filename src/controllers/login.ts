import { Request, Response, Router } from "express";
import authService from "../services/login";

const loginController = Router();

loginController.post("/", (req: Request, res: Response) => {
  const { id, email, password } = req.body;

  // Verificar que las credenciales coinciden con el mockUser y return id.
  const payload = authService.login(id, email, password);

  // Crear un token JWT que expire en 1 hora
  const token = authService.signJWT(payload);

  //Devolvemos el token al cliente
  res.json({ token });
});

export default loginController;
