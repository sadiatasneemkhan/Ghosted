import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import userRouter from "./routes/users.js";
import customerRouter from "./routes/customers.js";
import restaurantRouter from "./routes/restaurants.js";
import messagesRouter from "./routes/messages.js";
import orderItemsRouter from "./routes/orderItems.js";
import ordersRouter from "./routes/orders.js";
import cartRouter from "./routes/cart.js";
import cartItemsRouter from "./routes/cartItems.js";
import menuItemsRouter from "./routes/menuItems.js";
import uploadRouter from "./routes/upload.js";
import {
  createMessage,
  getConversationByUserId,
} from "./controllers/messagesController.js";

import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/order_items", orderItemsRouter);
app.use("/orders", ordersRouter);
app.use("/cart", cartRouter);
app.use("/cart_items", cartItemsRouter);
app.use("/menu_items", menuItemsRouter);
app.use("/users", userRouter);
app.use("/customers", customerRouter);
app.use("/restaurants", restaurantRouter);
app.use("/messages", messagesRouter);
app.use("/upload", uploadRouter);

// for images only
app.use("/images", express.static("./images"));

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send(
      "Uh oh, our website is down temporarily! Please revisit shortly or contact us at xxxx@ucalgary.ca with your inquiries"
    );
});

// Database connection test
async function testDbConnection() {
  try {
    const [rows] = await pool.query("SELECT VERSION()");
    console.log(
      "Database connection successful. MySQL version is:",
      rows[0]["VERSION()"]
    );
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testDbConnection();

const PORT = process.env.PORT || 3001;

//instant messaging

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//listen for when client connects
io.on("connection", (socket) => {
  // When client connects
  console.log(`User connected ${socket.id}`);

  // Join a room - get all old messages
  socket.on("join_room", async (data) => {
    const { sender_id, receiver_id, room } = data;
    socket.join(room);
    try {
      const messages = await getConversationByUserId(sender_id, receiver_id);
      io.to(room).emit("load_conversation", messages);
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  });

  // Send/receive messages in a chat
  socket.on("send_message", async (data) => {
    const { sender_id, receiver_id, content, room } = data;
    try {
      const message = await createMessage(sender_id, receiver_id, content);
      io.to(room).emit("receive_message", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // On disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
