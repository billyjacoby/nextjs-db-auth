import { _authorize } from "./functions/_authorize";
import { _logUserIn } from "./functions/_logUserIn";
import Cookies from "cookies";

const authorize = async function (req, res) {
  let data = JSON.parse(req.body);
  try {
    const { isAuthorized, user } = await _authorize(
      data.username,
      data.password
    );

    if (isAuthorized) {
      const { refreshCookie, accessCookie } = await _logUserIn(user._id, req);
      const cookies = new Cookies(req, res);
      cookies.set("refreshToken", refreshCookie.refreshToken, {
        ...refreshCookie.options,
      });
      cookies.set("accessToken", accessCookie.accessToken, {
        ...accessCookie.options,
      });
      res.status(200).json({
        data: {
          status: "success",
          user,
        },
      });
    } else {
      res.status(301).json({
        data: {
          error: "Failed to authenticate",
        },
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      data: {
        error: "Server error",
      },
    });
  }
};

export default authorize;
