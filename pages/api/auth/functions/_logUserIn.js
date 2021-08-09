import { _createSession } from "./_session";
import { _refreshTokens } from "./_user";

export async function _logUserIn(userId, req) {
  const connectionInformation = {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };

  const sessionToken = await _createSession(userId, connectionInformation);
  const newCookies = await _refreshTokens(sessionToken, userId);

  return newCookies;
}
