import express from "express";
import multer from "multer";
import {
  getImageTest,
  postImageTest,
} from "../controllers/uploadController.js";

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

router.post("/", upload.single("file"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const url = req.file.filename;
  const test = await postImageTest(url);
  res.send(test);
});

router.get("/", async (req, res) => {
  const url = await getImageTest();
  res.send(url);
});

export default router;
