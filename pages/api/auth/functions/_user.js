import { ObjectId } from "bson";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../util/mongodb";

import { createTokens, _createTokens } from "./_tokens.js";

const JWTSecret = process.env.JWT_SECRET;

export async function _getUserFromCookie(cookies) {
  try {
    const { db } = await connectToDatabase();
    const user = db.collection("user");
    const session = db.collection("session");

    const refreshToken = cookies.get("refreshToken");
    const accessToken = cookies.get("accessToken");

    if (accessToken) {
      const decodedAccessToken = jwt.verify(accessToken, JWTSecret);

      const currentUser = user.findOne({
        _id: ObjectId(decodedAccessToken?.userId),
      });
      return currentUser;
    }

    if (refreshToken) {
      const { sessionToken } = jwt.verify(refreshToken, JWTSecret);

      const currentSession = await session.findOne({
        sessionToken,
      });

      if (currentSession.valid) {
        const currentUser = await user.findOne({
          _id: ObjectId(currentSession.userId),
        });

        const { refreshCookie, accessCookie } = await _refreshTokens(
          sessionToken,
          currentUser._id
        );

        const cookieSet = await _setCookies(
          refreshCookie,
          accessCookie,
          cookies
        );
        console.log("Cookies set?: ", cookieSet);

        return { currentUser };
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export async function _refreshTokens(sessionToken, userId) {
  //* need to figure out how to set cookies here...
  try {
    const { accessToken, refreshToken } = await createTokens(
      sessionToken,
      userId
    );

    const now = new Date();
    const refreshExpires = now.setDate(now.getDate() + 30);
    const refreshCookie = {
      refreshToken,
      options: {
        path: "/",
        //* UPDATE FOR PROD
        // domain: "0.0.0.0",
        httpOnly: true,
        expires: new Date(refreshExpires),
      },
    };

    const accessCookie = {
      accessToken,
      userId,
      options: {
        path: "/",
        //* UPDATE FOR PROD
        // domain: "0.0.0.0",
        httpOnly: true,
      },
    };

    return { refreshCookie, accessCookie };
  } catch (e) {
    console.error(e);
  }
}

async function _setCookies(refreshCookie, accessCookie, cookies) {
  try {
    cookies.set("refreshToken", refreshCookie.refreshToken, {
      ...refreshCookie.options,
    });
    cookies.set("accessToken", accessCookie.accessToken, {
      ...accessCookie.options,
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
