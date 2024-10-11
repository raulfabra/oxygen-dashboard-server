import { NextFunction, Request, Response } from "express";
import authService from "../services/login";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  // Get token from the headers and verify it
  const authHeader = req.headers["authorization"] || "";
  console.log("Obtener token de la req.header: ", authHeader);
  const token = authHeader && authHeader.split(" ")[1]; // Obtener el token del header Authorization
  console.log("token haciendole un split: ", token);

  if (!token) {
    res.status(401).json({ message: "Access denied. Token not provided." });
  }

  try {
    // Verificar el token
    const decoded = authService.verifyJWT(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

export default authMiddleware;
