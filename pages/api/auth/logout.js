import Cookie from "cookies";

function logout(req, res) {
  const cookies = new Cookie(req, res);
  cookies.set("refreshToken");
  cookies.set("accessToken");

  res.status(200).json({ result: "Success - Logged out." });
}

export default logout;
