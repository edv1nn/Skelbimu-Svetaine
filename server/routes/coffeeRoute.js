import express from "express";
import {
  addCoffee,
  getCoffeeList,
  removeCoffee,
} from "../controllers/coffeeController.js";
import multer from "multer";

const coffeeRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

coffeeRouter.post("/add", upload.single("image"), addCoffee);
coffeeRouter.get("/list", getCoffeeList);
coffeeRouter.post("/remove", removeCoffee);

export default coffeeRouter;
