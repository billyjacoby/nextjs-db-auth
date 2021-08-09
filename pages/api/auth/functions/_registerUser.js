import { genSalt, hash } from "bcryptjs";
import { connectToDatabase } from "../../../../util/mongodb";

export async function _registerUser(username, email, password, res) {
  const { db } = await connectToDatabase();

  const user = await db.collection("user");

  if (username && email && password) {
    //* Check to see if username is unique
    const isUnique = !(await user.findOne({
      username,
    }));
    if (isUnique) {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      // TODO: setup proper user info here...

      const result = await user.insertOne({
        username,
        email,
        password: hashedPassword,
        title: null,
        settings: {
          lastDate: null,
          testSetting: "this is a test",
        },
      });

      return result;
    } else
      return {
        error: "Unable to process request",
        errorDetails: "Username is already taken",
      };
  } else {
    return {
      error: "Unable to process request",
      errorDetails: "Please enter a username, email address, and password",
    };
  }
}
