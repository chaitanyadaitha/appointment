import mongoose from "mongoose";
import PostAppointment from "../models/appointmentSchema.js";

export const getAppointment = async (req, res) => {
  try {
    const appointments = await PostAppointment.find();

    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const createAppointment = async (req, res) => {
  const appointment = req.body;

  const newAppoint = new PostAppointment(appointment);

  try {
    if (appointment.firstName == "") {
      throw { message: "Error!!!" };
    } else {
      await newAppoint.save();
      res.status(201).json(newAppoint);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  const { id: _id } = req.params;

  const appointment = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Appointments with that ID");

  const updatedAppointment = await PostAppointment.findByIdAndUpdate(
    _id,
    { ...appointment, _id },
    { new: true }
  );

  res.json(updatedAppointment);
};

export const deleteAppointment = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Appointments with that ID");

  await PostAppointment.findByIdAndRemove(_id, {
    new: true,
  });

  res.json(_id);
};
