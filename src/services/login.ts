import jwt from "jsonwebtoken";

const defaultUser = {
  id: 100,
  email: "employer33@gmail.com",
  password: "1234",
};
const TOKEN_SECRET = require("crypto").randomBytes(64).toString("hex");

async function login(user: string, pass: string) {
  // Check if the user and password are correct
}

function signJWT(payload: { userId: number }): string {
  // Sign the jwt token
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1800s" });
}

function verifyJWT(token: string) {
  // Verify the jwt token
}

const authService = {
  login,
  signJWT,
  verifyJWT,
};

export default authService;
