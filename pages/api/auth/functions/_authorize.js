import { compare } from "bcryptjs";
import { connectToDatabase } from "../../../../util/mongodb";

export async function _authorize(username, password) {
  console.log(username);
  const { db } = await connectToDatabase();

  const user = await db.collection("user");

  const userData = await user.findOne({ username });
  const savedPassword = userData?.password;

  if (savedPassword) {
    console.log(username, password);
    const isAuthorized = await compare(password, savedPassword);

    if (isAuthorized) {
      let { username, title, email, settings } = await userData;
      return {
        isAuthorized,
        user: {
          _id: userData._id.toString(),
          username,
          title,
          email,
          settings,
        },
      };
    } else {
      return null;
    }

    // return { isAuthorized, userId: userData._id, title: userData.title };
  }

  return false;
}
