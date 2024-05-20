import { Router } from "express";
import auth from "../../middleware/authUser.js";
import { fileUpload } from "../../utils/multer.js";
import { asyncHandler } from "../../utils/errorHandling.js";

import * as controllers from "./user.controllers.js";
import { validation } from "../../middleware/validation.js";
import * as validaters from "./user.validation.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "User Module" });
});

router.get("/profile", auth(), controllers.getProfile);

router.post(
  "/rate/doctor",
  validation(validaters.rateDoctor),
  auth(),
  controllers.rateDoctor
);

router.post(
  "/upload",
  auth(),
  fileUpload({}).array("image"),
  validation(validaters.uploadPhoto),
  asyncHandler(controllers.uploadPhoto)
);
router.post(
  "/scan/upload",
  auth(),
  fileUpload({}).array("image"),
  validation(validaters.uploadPhoto),
  asyncHandler(controllers.uploadPhotoAndAnaylsis)
);

router.get("/search", auth(), asyncHandler(controllers.searchDoctor));

router.get("/doctor/:id", auth(), asyncHandler(controllers.getDoctorById));
export default router;
