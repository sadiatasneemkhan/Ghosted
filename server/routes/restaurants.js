import express from "express";

//import methods from controller
import { createUser } from "../controllers/usersController.js";

import {
  getRestaurantByRestId,
  getRestaurantByUserId,
  getRestaurantId,
  getRestaurantStatusByUserId,
  getRestaurantUserId,
  createRestaurant,
  updateRestaurantByUserId,
  pauseRestaurant,
  deleteRestaurant,
  resumeRestaurant,
} from "../controllers/restaurantsController.js";

const router = express.Router();

router.get("/:restaurant_id", async (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const restaurant = await getRestaurantByRestId(restaurant_id);
  res.send(restaurant);
});

router.get("/user_id/:restaurant_id", async (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const id = await getRestaurantUserId(restaurant_id);
  res.send(id);
});

router.get("/status/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const restaurant = await getRestaurantStatusByUserId(user_id);
  res.send(restaurant);
});

router.get("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const restaurant = await getRestaurantByUserId(user_id);
  res.send(restaurant);
});

router.get("/getid/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const restaurant_id = await getRestaurantId(user_id);
  res.send(restaurant_id);
});

router.post("/", async (req, res) => {
  const {
    phone,
    email,
    password,
    first_name,
    last_name,
    business_name,
    address,
    city,
    province,
  } = req.body;
  const user_id = await createUser(2, phone, email, password);
  const restaurant = await createRestaurant(
    user_id,
    first_name,
    last_name,
    business_name,
    address,
    city,
    province
  );
});

router.put("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const restaurant = await updateRestaurantByUserId(req.body, user_id);
    res.send(restaurant);
  } catch (error) {
    res.status(500).send("Restaurant update failed");
  }
});

router.put("/pause/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const restaurant = await pauseRestaurant(user_id);
  res.send(restaurant);
});

router.put("/resume/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const restaurant = await resumeRestaurant(user_id);
  res.send(restaurant);
});

router.put("/delete/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const result = await deleteRestaurant(user_id);
  //   console.log(result);
  if (result.affectedRows === 0) {
    res.status(404).send("Favourite not found");
  } else {
    res.status(200).send("Successfully deleted");
    res.send(result);
  }
});

export default router;
