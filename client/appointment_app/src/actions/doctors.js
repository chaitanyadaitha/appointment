import * as api from "../api";

// Action creators.

export const getDoctors = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDoctors();
        dispatch({ type: "FETCH_ALL_DOCTORS", payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "ERROR", payload: error });
    }
};

export const addAppointmentToDoctor = (id, list, patient) => async (dispatch) => {
    try {
        const { data } = await api.addAppointment(id, { time: list, patient });
        dispatch({ type: "ADDED_APPOINTMENT", payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "ERROR", payload: error });
    }
}
