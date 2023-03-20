import express, { json } from "express";
import { UserRoute } from "./4-routes/usersRoute";
import cors from "cors";
import { CategoriesRoute } from "./4-routes/categoriesRoute";
import { ProductsRoute } from "./4-routes/productsRoute";
import { CartRoute } from "./4-routes/cartRoute";
import { MessagesRoute } from "./4-routes/messagesRoute";
import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";
import { configFirebase } from "./1-dal/firebase-config";
import mongoose from "mongoose";
initializeApp(configFirebase.firebaseConfig);

dotenv.config();

const fileUpload = require("express-fileupload");

const server = express();

server.use(cors());
server.use(json());
server.use(fileUpload());

server.use(UserRoute);
server.use(CategoriesRoute);
server.use(ProductsRoute);
server.use(CartRoute);
server.use(MessagesRoute);

mongoose
  .connect("mongodb://localhost:27017/yad2")
  .then(() => {
    console.log("mongo connection open!!");
  })
  .catch((err) => {
    console.log("no connection start");
  });
console.log(process.env.PORT);
server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
