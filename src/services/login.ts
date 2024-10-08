import { mockUser } from "../utils/constants";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function login(id: number, email: string, password: string) {
  // Check if the user and password are correct
  if (email === mockUser.email && password === mockUser.password) {
    //Devolvemos el ID del usuario-cliente
    return { userId: id };
  } else {
    console.log({ error: "Missing credentials. This user don't exist" });
    return { userId: NaN };
  }
}

function signJWT(payload: { userId: number }): string {
  // Sign the jwt token
  const TOKEN_SECRET = process.env.SECRET || "secret";
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "3600s" });
}

function verifyJWT(token: string) {
  // Verify the jwt token
  const algo = jwt.verify(token, process.env.TOKEN_SECRET as string, { complete: true });
  console.log("HOLA", algo);
}

const authService = {
  login,
  signJWT,
  verifyJWT,
};

export default authService;
