import { NextFunction, Request, Response } from "express";
import authService from "../services/login";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Get the jwt token from the headers and verify it
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.sendStatus(401);

  authService.verifyJWT(token);

  next();
}

export default authMiddleware;
