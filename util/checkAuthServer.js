import Cookies from "cookies";
import { _getUserFromCookie } from "../pages/api/auth/functions/_user";

async function checkAuthServer(context) {
  const { req, res } = context;
  const cookies = new Cookies(req, res);

  const userData = await _getUserFromCookie(cookies);
  if (userData) {
    console.log("user here");
    let { username, title, email, settings } = userData;
    const user = {
      _id: userData._id.toString(),
      username,
      title,
      email,
      settings,
    };
    return {
      props: {
        user,
      },
    };
  } else {
    return {
      props: {
        user: null,
      },
    };
  }
}
export default checkAuthServer;
