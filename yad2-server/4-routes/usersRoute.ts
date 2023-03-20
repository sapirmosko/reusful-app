import express from "express";
import { hashedPassword } from "../1-dal/hashedPassword";
import {
  addImageForUser,
  getAllUsers,
  getUserById,
  register,
} from "../2-logic/usersLogic";
import { UserInterface } from "../models/userModel";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const UserRoute = express.Router();

UserRoute.get("/users", (req, res) => {
  const users = getAllUsers();
  try {
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json(e);
  }
});

UserRoute.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getUserById(+id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
});

UserRoute.post("/users/register", async (req, res) => {
  const user: UserInterface = req.body;
  //user.password = hashedPassword(user.password)
  console.log(user.password);

  try {
    const token = await register(user);

    res.status(200).json(token);
  } catch (e) {
    res.status(400).json(e);
  }
});

UserRoute.post("/users/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(auth, email, password);
    if (user.user != null) {
      const token = await user.user.getIdToken(true);
      res.status(200).json(token);
    } else {
      res.status(401).json("wrong username or password");
    }
  } catch (e) {
    res.status(400).json("something went wrong...");
  }
});

UserRoute.post("/users/addimage/:id", async (req: any, res: any) => {
  const file = req.files.userImage;
  const id = req.params.id;

  if (file.length === 0) return;

  try {
    await addImageForUser(file, id);
  } catch (e) {
    res.status(400).json(e);
  }
});
