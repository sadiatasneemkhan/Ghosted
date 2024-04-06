import express from "express";
//import methods from controller
import { getUser, getUserById } from "../controllers/usersController.js";

const router = express.Router();

//normally we don't use .post for retrieving data, but we're doing it for login for authentication. don't do this elsewhere tho
router.post("/", async (req, res) => {
  const { user, pass } = req.body;
  const login = await getUser(user, pass);
  res.send(login);
});

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const user = await getUserById(user_id);
  res.send(user);
});

// testing  purposes

// router.get("/email/:email", async (req, res) => {
//   const email = req.params.email;
//   const user = await getUserPassword(email);
//   res.send(user);
// });

// router.put("/:user_id", async (req, res) => {
//   const user_id = req.params.user_id;
//   const password = req.body.password;

//   try {
//     await updatePasswordByUserId(user_id, password);
//     res.status(200).send("Password updated successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error, failed to change password");
//   }
// });

export default router;
