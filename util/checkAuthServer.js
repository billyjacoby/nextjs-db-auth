import Cookies from "cookies";

async function checkAuthServer(context) {
  const { req, res } = context;
  const cookies = new Cookies(req, res);
  const refreshToken = cookies.get("refreshToken");
  const accessToken = cookies.get("accessToken");

  // TODO: Implement the logic to check cookies here and return the user object

  console.log();
  //* Soft auth check only - Just checks to see if these tokens exist.
  //* Ensure that these are verified on all server calls
  let isAuthenticated = false;
  if (accessToken || refreshToken) {
    isAuthenticated = true;
  }
  return {
    props: {
      isAuthenticated,
    },
  };
}

export default checkAuthServer;
