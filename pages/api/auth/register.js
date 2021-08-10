import { _registerUser } from "./functions/_registerUser.js";
import { _logUserIn } from "./functions/_logUserIn.js";
import Cookies from "cookies";

const register = async (req, res) => {
  try {
    const user = await _registerUser(
      req.body.username,
      req.body.email,
      req.body.password,
      res
    );
    if (!user.error) {
      // TODO: Factor this into its own file (logging in and setting cookies)
      const { refreshCookie, accessCookie } = await _logUserIn(
        user.insertedId.toString(),
        req
      );
      const cookies = new Cookies(req, res);
      cookies.set("refreshToken", refreshCookie.refreshToken, {
        ...refreshCookie.options,
      });
      cookies.set("accessToken", accessCookie.accessToken, {
        ...accessCookie.options,
      });
      // TODO: send the user back to the home page here
      res.status(200).json({
        data: {
          status: "SUCCESS",
          user,
        },
      });
    } else {
      res.status(200).json(user);
    }
  } catch (e) {
    let errorDetails;
    if (!req.body.username) {
      errorDetails = "No username provided";
    }
    if (!req.body.username) {
      errorDetails = "No password provided";
    }
    if (!req.body.email) {
      errorDetails = "No password provided";
    }
    res.status(500).json({
      error: "Unable to process request",
      errorDetails,
    });
    console.error(e);
  }
};

export default register;
