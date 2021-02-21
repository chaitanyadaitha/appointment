import axios from "axios";

const url = "http://localhost:5000/appointments";

export const fetchAppointments = () => axios.get(url);

export const postAppointment = (appointment) => axios.post(url, appointment);

export const updateAppointment = (id, appointment) =>
  axios.patch(`${url}/${id}`, appointment);

export const deleteAppointment = (id) => axios.delete(`${url}/${id}`);
