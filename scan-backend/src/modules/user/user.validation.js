import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";
import mongoose from "mongoose";
export const uploadPhoto = Joi.object({
  file: Joi.array().items(generalFields.file.required()).required(),
}).required();

export const rateDoctor = Joi.object({
  doctorID: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Mongo ObjectId")
    .required(),
  rate: Joi.number().min(0).max(5).required(),
}).required();
