import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dal";
import { UserInterface } from "../models/userModel";
import { saveImagesToS3User } from "./awsLogic";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const uniqid = require("uniqid");

export async function getAllUsers() {
  const query = "SELECT * FROM users";
  const [results] = await execute(query);
  return results;
}

export async function getUserById(id: number) {
  const query = `SELECT firstName,lastName,username,country,city,streetAddress,email,userImage FROM users WHERE id = ${id}`;
  const [results] = await execute(query);
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
    console.log("SUCCESS");
    return await userCreated.user.getIdToken(true);
  } else {
    console.log("fail");
  }
}

export async function addImageForUser(file: any, id: number) {
  const imageId = "profileImage" + uniqid();
  const key = await saveImagesToS3User(file, imageId);
  const query = `UPDATE users SET userImage = '${key}' where id =${id}`;
  const [results] = await execute(query);
  return results;
}
