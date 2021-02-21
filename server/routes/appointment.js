import express from "express";
import {
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.js";

const router = express.Router();

router.get("/", getAppointment);

router.post("/", createAppointment);

router.patch("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;
