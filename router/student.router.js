import express from "express";
import { body } from "express-validator";
import { add_Data, filterData } from "../controllers/student.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const studentroute = express.Router();

studentroute.post(
  "/add-data",
  upload.fields([
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  add_Data
);

studentroute.post("/find-data",filterData)

export { studentroute };
