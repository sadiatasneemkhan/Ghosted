import express from "express";
import {
  getConversationByUserId,
  getAllMessagesByUserId,
  createMessage,
  getAllCustomersByUserId,
  getAllRestaurantsByUserId,
  getCustomerNameByUserId,
  getBusinessNameByUserId,
} from "../controllers/messagesController.js";

const router = express.Router();

router.get("/convo_customer/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const reciever = await getCustomerNameByUserId;
    res.send(reciever);
  } catch (error) {
    console.error;
    res.status(500).send("Failed to retrieve current conversing customer");
  }
});

router.get("/convo_business/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const reciever = await getBusinessNameByUserId;
    res.send(reciever);
  } catch (error) {
    console.error;
    res.status(500).send("Failed to retrieve current conversing business");
  }
});

router.get("/restaurants/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const recievers = await getAllRestaurantsByUserId;
    res.send(recievers);
  } catch (error) {
    console.error;
    res.status(500).send("Failed to retrieve all conversing businesses");
  }
});

router.get("/customers/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const recievers = await getAllCustomersByUserId;
    res.send(recievers);
  } catch (error) {
    console.error;
    res.status(500).send("Failed to retrieve all conversing customers");
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const messages = await getAllMessagesByUserId(user_id);
    res.send(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch messages");
  }
});

router.get("/:user_id/:receiver_id", async (req, res) => {
  try {
    const { user_id, receiver_id } = req.params;
    const messages = await getConversationByUserId(user_id, receiver_id);
    res.send(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch messages");
  }
});

router.post("/:user_id", async (req, res) => {
  try {
    const sender_id = req.params.user_id;
    const { receiver_id, content } = req.body;
    const message = await createMessage(sender_id, receiver_id, content);
    res.send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send message");
  }
});

export default router;
