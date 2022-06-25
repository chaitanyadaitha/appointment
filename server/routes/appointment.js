import express from "express";
import {
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.js";

import {
  getDoctors,
  addAppointment
} from '../controllers/doctors.js';
const router = express.Router();

// Doctors.
// router.get("/", createDoctors);
router.get("/", getDoctors);

router.patch("/:id", addAppointment);

// Appointments.
router.get("/", getAppointment);

router.post("/", createAppointment);

router.patch("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;
