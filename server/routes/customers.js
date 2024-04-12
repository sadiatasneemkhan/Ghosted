import express from "express";
import multer from "multer";

//import methods from controller
import { createUser } from "../controllers/usersController.js";
import {
  getCustomerByCustId,
  getCustomerByUserId,
  createCustomer,
  getCustomerUserId,
  getCustomerId,
  updateCustomerByUserId,
  updateCustomerPicByUserId,
  getCustomerPicByUserId,
} from "../controllers/customersController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const customer = await getCustomerByCustId(customer_id);
  res.send(customer);
});

router.get("/getid/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const customer_id = await getCustomerId(user_id);
  res.send(customer_id);
});

router.get("/user_id/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const id = await getCustomerUserId(customer_id);
  res.send(id);
});

router.get("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const customer = await getCustomerByUserId(user_id);
  res.send(customer);
});

router.post("/", async (req, res) => {
  const {
    phone,
    email,
    password,
    first_name,
    last_name,
    address,
    city,
    province,
  } = req.body;
  const user_id = await createUser(1, phone, email, password);
  const customer = await createCustomer(
    user_id,
    first_name,
    last_name,
    address,
    city,
    province
  );
  res.send(customer);
});

router.put("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const customer = await updateCustomerByUserId(req.body, user_id);
    res.send(customer);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Customer update failed", error: error.message });
  }
});

/*
router.put("/name/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { first_name, last_name } = req.body;
  const customer = await updateCustomerNameByUserId(
    first_name,
    last_name,
    user_id
  );
  res.send(customer);
});



router.put("/phone/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { phone } = req.body;
  const customer = await updatePhoneByUserId(phone, user_id);
  res.send(customer);
});

router.put("/email/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { email } = req.body;
  const customer = await updateEmailByUserId(email, user_id);
  res.send(customer);
});

router.put("/password/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { password } = req.body;
  const customer = await updatePasswordByUserId(password, user_id);
  res.send(customer);
});


router.put("/address/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { address, city, province } = req.body;
  const customer = await updateCustomerAddressByUserId(
    address,
    city,
    province,
    user_id
  );
  res.send(customer);
});
*/

router.post("/pfp/:userId", upload.single("file"), async (req, res) => {
  const userId = req.params.userId;
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const url = req.file.filename;

  try {
    await updateCustomerPicByUserId(url, userId);
    const customer = await getCustomerByUserId(userId);
    res.send(customer);
  } catch (error) {
    console.error("Failed to update customer pfp:", error);
    res.status(500).send("Failed to update customer pfp.");
  }
});

router.get("/pfp/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const customer = await getCustomerPicByUserId(user_id);
  res.send(customer);
});

export default router;
