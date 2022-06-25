import axios from "axios";

const url = "http://localhost:5000/appointments";

// Doctors

export const fetchDoctors = () => axios.get(`${url}`);

export const addAppointment = (id, list) => axios.patch(`${url}/${id}`, list)
// export const createDoctors = () => axios.post(url, []);

export const fetchAppointments = () => axios.get(url);

export const postAppointment = (appointment) => axios.post(url, appointment);

export const updateAppointment = (id, appointment) =>
  axios.patch(`${url}/${id}`, appointment);

export const deleteAppointment = (id) => axios.delete(`${url}/${id}`);
