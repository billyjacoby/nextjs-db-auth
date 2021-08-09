import { _authorize } from "./functions/_authorize";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { isAuthorized, userId } = await _authorize(username, password);
    console.log(isAuthorized);
    if (!isAuthorized) {
      res.status(200).json(false);
    } else {
      res.status(200).json(userId);
    }
  } catch (e) {
    let errorDetails;
    console.error(e);
    res.status(500).json({
      error: "Unable to process request",
      errorDetails,
    });
  }
};

export default login;
