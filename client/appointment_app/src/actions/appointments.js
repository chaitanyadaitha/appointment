import * as api from "../api";

// Action creators.

export const getAppointments = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAppointments();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error });
  }
};

export const postAppointment = (appointment) => async (dispatch) => {
  try {
    const { data } = await api.postAppointment(appointment);
    dispatch({ type: "CREATE_APPOINTMENT", payload: data });
    dispatch({ type: "ADD_APPOINTMENT_TO_DOCTOR", payload: data.appointment_info })
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: "ERROR", payload: error.response.data.errorMessage });
    } else dispatch({ type: "ERROR", payload: error });
  }
};

export const updateAppointment = (id, appointment) => async (dispatch) => {
  try {
    const { data } = await api.updateAppointment(id, appointment);

    dispatch({ type: "UPDATE_APPOINTMENT", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error });
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    await api.deleteAppointment(id);

    dispatch({ type: "DELETE_APPOINTMENT", payload: id });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error });
  }
};
