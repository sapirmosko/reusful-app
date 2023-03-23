import express, { json } from "express";
import { UserRoute } from "./4-routes/usersRoute";
import cors from "cors";
import { CategoriesRoute } from "./4-routes/categoriesRoute";
import { ProductsRoute } from "./4-routes/productsRoute";
import { CartRoute } from "./4-routes/cartRoute";
import { MessagesRoute } from "./4-routes/messagesRoute";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import * as dotenv from "dotenv";
import { configFirebase } from "./1-dal/firebase-config";
import mongoose from "mongoose";

import { createServer } from 'http';
import { Server } from "socket.io";
initializeApp(configFirebase.firebaseConfig);
// Create a root reference
export const storage = getStorage();

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


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

let userCount = 0;

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  console.log('a user connected');
  userCount++;

  io.emit('userCount', userCount);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    console.log(`Client disconnected: ${socket.id}`);
    userCount--;
    io.emit('userCount', userCount);
  });
});

// httpServer.listen(3000, () => {
//   console.log(`Server listening on port 3000`);
// });

mongoose
  .connect("mongodb://127.0.0.1:27017/yad2")
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
