import mongoose from "mongoose";
import PostAppointment from "../models/appointmentSchema.js";
import Doctors from "../models/doctorsSchema.js";

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

  let appointments_list = [];
  const newAppoint = new PostAppointment(appointment);

  const doctorInfo = await Doctors.findById(req.body.doctor);

  if (doctorInfo) {
    const start = doctorInfo.availability[0];
    const end = doctorInfo.availability[1];
    const appointment_time = Number(new Date(req.body.doa).toLocaleString('en-GB').split(',')[1].trim().split(':')[0]);
    console.log(appointment_time, start, end)
    if (appointment_time < start || appointment_time >= end) {
      let error = {
        errorMessage: `Doctor is not in service at this time ${new Date(req.body.doa).toLocaleString('en-GB').split(',')[1].trim()}`,
      }
      return res.status(500).json(error);
    } else {
      appointments_list.push({
        doctor: req.body.doctor,
        appointment: new Date(req.body.doa).toLocaleString('en-GB').split(',')[1].trim(),
        patient: `${newAppoint.firstName} ${newAppoint.lastName}`
      })
    }
  }

  try {
    if (appointment.firstName == "") {
      throw { message: "Error!!!" };
    } else {
      await newAppoint.save();
      res.status(201).json({ newAppoint, appointment_info: appointments_list });
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
