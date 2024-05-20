import appointmentModel from "../../../DB/model/Appointment.model.js";
import DoctorModel from "../../../DB/model/Doctor.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { PROJECT_FOLDER } from "../../../config/config.js";
import moment from "moment";

export const updateDoctor = async (req, res, next) => {
  const { _id } = req.user;
  const doctor = await DoctorModel.findById(_id);

  if (!doctor) {
    return next(new Error("Doctor not found", { cause: 404 }));
  }
  if (req.body.firstName) {
    doctor.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    doctor.lastName = req.body.lastName;
  }
  if (req.body.email) {
    const existingDoctor = await DoctorModel.findOne({ email: req.body.email });
    if (existingDoctor && existingDoctor._id.toString() !== _id) {
      return next(new Error("Email already exists", { cause: 409 }));
    }
    doctor.email = req.body.email;
  }
  if (req.body.availableDates) {
    const existingDates = doctor.availableDates.map((date) =>
      moment(date).format("YYYY-MM-DD")
    );
    const uniqueNewDates = new Set();
    for (const i of req.body.availableDates) {
      const fromMoment = moment(new Date(i)).format("YYYY-MM-DD");
      if (!existingDates.includes(fromMoment)) {
        uniqueNewDates.add(fromMoment);
      } else {
        return next(new Error("You entered an existing date", 400));
      }
    }
    doctor.availableDates.push(...uniqueNewDates);
  }
  if (req.body.address) {
    doctor.address = req.body.address;
  }
  if (!Object.keys(req.body).length) {
    return next(new Error("please enter the updated fields", { cause: 400 }));
  }
  await doctor.save();

  return res.status(200).json(doctor);
};

export const uploadPhoto = async (req, res, next) => {
  const { _id } = req.user;
  if (!req.file) {
    return next(new Error("Please upload your image", { cause: 400 }));
  }
  const doctor = await DoctorModel.findById(_id);
  if (!doctor.Image.public_id) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${PROJECT_FOLDER}/Profile/Dr.${doctor.firstName} ${doctor.lastName}`,
      }
    );
    doctor.Image = {
      path: secure_url,
      public_id,
    };
    await doctor.save();
    return res.status(201).json({ message: "Done" });
  }
  const result = await cloudinary.uploader.destroy(doctor.Image.public_id);
  if (result.result !== "ok" && result.result !== "not found") {
    return next(
      new Error("Failed to delete user photo from Cloudinary", { cause: 400 })
    );
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${PROJECT_FOLDER}/Profile/Dr.${doctor.firstName} ${doctor.lastName}`,
    }
  );
  doctor.Image = {
    path: secure_url,
    public_id,
  };
  await doctor.save();
  return res.status(201).json({ message: "Done" });
};

export const getAppointment = async (req, res, next) => {
  const { _id } = req.user;
  const doctor = await DoctorModel.findById({ _id });
  if (!doctor) {
    return next(new Error("Invalid Doctor", { cause: 404 }));
  }

  const appointments = await appointmentModel
    .find({ doctorId: doctor._id, isCanceled: false })
    .populate({ path: "userId" });
  if (!appointments.length) {
    return next(
      new Error("There Is no appointment for you doctor", { cause: 404 })
    );
  }
  return res.status(200).json({ message: "Done", appointments });
};

export const getProfile = async (req, res, next) => {
  const { _id } = req.user;
  const doctor = await DoctorModel.findById({ _id });
  if (!doctor) {
    return next(new Error("Invalid Doctor", { cause: 404 }));
  }
  return res.status(200).json({ message: "Done", doctor });
};

export const getDoctors = async (req, res) => {
  const doctors = await DoctorModel.find()
    .sort({ rating: 1 })
    .select("firstName address lastName phone email availableDates rating")
    .populate([
      {
        path: "Appointments",
      },
    ]);
  if (doctors.length === 0) {
    return res.status(404).json({ message: "There is no doctors" });
  }
  res.status(200).json({ message: "Done", doctors });
};

export const getConfirmedAppointments = async (req, res, next) => {
  const { _id } = req.user;
  const doctor = await DoctorModel.findById({ _id });
  if (!doctor) {
    return next(new Error("Invalid Doctor", { cause: 404 }));
  }
  const appointments = await appointmentModel
    .find({
      doctorId: doctor._id,
      isConfirmed: true,
    })
    .populate("userId");
  if (appointments.length === 0) {
    return res
      .status(404)
      .json({ message: "There is no confirmed appointments" });
  }
  return res.status(200).json({ message: "Done", appointments });
};
