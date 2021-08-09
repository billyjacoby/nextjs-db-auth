import { _registerUser } from "./functions/_registerUser.js";

const register = async (req, res) => {
  try {
    console.log(!!req.body.username);
    const user = await _registerUser(
      req.body.username,
      req.body.email,
      req.body.password,
      res
    );
    if (!user.error) {
      console.log(user);
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
