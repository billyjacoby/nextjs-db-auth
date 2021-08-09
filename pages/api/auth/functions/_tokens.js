import jwt from "jsonwebtoken";

const JWTSecret = process.env.JWT_SECRET;

export async function createTokens(sessionToken, userId) {
  try {
    const refreshToken = jwt.sign({ sessionToken }, JWTSecret);
    const accessToken = jwt.sign({ sessionToken, userId }, JWTSecret);

    return { refreshToken, accessToken };
  } catch (e) {
    console.error(e);
  }
}
