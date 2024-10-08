import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Get the jwt token from the headers and verify it
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.body = user;

    next();
  });
}
