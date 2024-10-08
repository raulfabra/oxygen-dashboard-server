import { Request, Response, Router } from "express";
import { mockUser } from "../utils/constants";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const loginController = Router();

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

loginController.post("/", (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Verificar que las credenciales coinciden con el mockUser

  if (email === mockUser.email && password === mockUser.password) {
    // Crear un token JWT que expire en 1 hora
    console.log(JWT_SECRET);
    const token = jwt.sign({ email: mockUser.email }, JWT_SECRET, { expiresIn: "24h" });

    //Devolvemos el token al cliente
    res.json({ token });
  } else {
    console.log({ error: "Missing credentials" });
  }
});

export default loginController;
