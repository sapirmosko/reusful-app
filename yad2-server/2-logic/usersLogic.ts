// import { execute } from "../1-dal/dal";
import { UserInterface, User } from "../models/userModel";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { hashedPassword } from "../1-dal/hashedPassword";
import { saveImagesToStorage } from "./storageLogic";

const uniqid = require("uniqid");

export async function getAllUsers() {
  const results = await User.find();
  return results;
}

export async function getUserById(id: string) {
  const results = await User.findById(id);
  return results;
}

export async function register(user: UserInterface) {
  const auth = getAuth();
  const userCreated = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  if (userCreated.user != null) {
    const newUser = new User({
      _id: userCreated.user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: hashedPassword(user.password),
      userImage: user.userImage,
      country: user.country,
      city: user.city,
      streetAddress: user.streetAddress,
    });
    newUser
      .save()
      .then(async (result) => {
        console.log("SUCCESS");
        return await userCreated.user.getIdToken(true);
      })
      .catch(async (error) => {
        getAuth().currentUser?.delete();
      });
  } else {
    console.log("fail");
  }
}

export async function addImageForUser(file: any, id: string) {
  // const imageId = "profileImage" + uniqid();
  // const key = await saveImagesToS3User(file, imageId);
  // const query = `UPDATE users SET userImage = '${key}' where id =${id}`;
  // const [results] = await execute(query);

  const imageId = uniqid();
  const url = await saveImagesToStorage(file, imageId);
  const results = await User.findByIdAndUpdate(id, { userImage: url });
  return results;
}
