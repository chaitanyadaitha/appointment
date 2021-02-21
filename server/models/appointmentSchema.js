import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  doa: {
    type: Date,
    default: new Date(),
  },
  message: String,
  selectedFile: String,
  place: String,
  phoneNumber: String,
});

const AppointmentSchema = mongoose.model(
  "AppointmentSchema",
  appointmentSchema
);

export default AppointmentSchema;
