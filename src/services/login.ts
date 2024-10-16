import UserModel, { UserSchemaInterface } from "../validators/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

async function login(email: string, password: string) {
  try {
    // Verificar usuario en la BD
    const user = await UserModel.findOne({ email });
    if (!user) return { success: false, message: "User not found" };

    // Verificar la contraseña del usuario
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { success: false, message: "Password incorrect" };
    }

    // Devolvemos el user
    return { success: true, message: "Authentication is correct", user };
  } catch (error) {
    console.log(error);
  }
}

function signJWT(user: UserSchemaInterface): string {
  // Sign the jwt token, creamos/registramos el token del user loggeado
  const TOKEN_SECRET = process.env.SECRET || "secret";
  return jwt.sign({ payload: user.email }, TOKEN_SECRET, { expiresIn: 3600 });
}

function verifyJWT(token: string) {
  // Verify the jwt token
  const TOKEN_SECRET = process.env.SECRET || "secret";
  return jwt.verify(token, TOKEN_SECRET as string, { complete: true });
}

const authService = {
  login,
  signJWT,
  verifyJWT,
};

export default authService;
