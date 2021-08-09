import { randomBytes } from "crypto";
import { connectToDatabase } from "../../../../util/mongodb";

export async function _createSession(userId, connection) {
  try {
    const sessionToken = randomBytes(43).toString("hex");
    const { ip, userAgent } = connection;

    const { db } = await connectToDatabase();
    const session = await db.collection("session");

    const result = session.insertOne({
      sessionToken,
      userId,
      valid: true,
      userAgent,
      ip,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    return sessionToken;
  } catch (e) {
    console.error(e);
    console.log("Session creation failed");
  }
}
