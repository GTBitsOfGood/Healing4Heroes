import { getAuth } from "firebase-admin/auth";
import UserModel from "server/mongodb/models/User";
import dbConnect, { firebaseConnect } from "./dbConnect";

export const getUser = async (accessToken: string) => {
  if (!accessToken) {
    throw new Error("This API endpoint requires an access token!");
  }
  firebaseConnect();
  const decodedToken = await getAuth().verifyIdToken(accessToken);
  if (!decodedToken || !decodedToken.uid) {
    throw new Error("Invalid access token!");
  }

  await dbConnect();
  const user = await UserModel.findOne({
    firebaseUid: decodedToken.uid,
  });

  if (!user) {
    throw new Error("Could not find user in database!");
  }
  return user;
};
