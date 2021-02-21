export default (
  appointments = { data: [], error: null, successMessage: null },
  action
) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...appointments, data: action.payload };
    case "CREATE_APPOINTMENT":
      return {
        ...appointments,
        data: [...appointments.data, action.payload],
        error: null,
        successMessage: "Appointment Created Successfully",
      };
    case "UPDATE_APPOINTMENT":
      return {
        ...appointments,
        data: [
          ...appointments.data.map((app) =>
            app._id == action.payload._id ? action.payload : app
          ),
        ],
        error: null,
        successMessage: "Appointment Edited Successfully",
      };
    case "DELETE_APPOINTMENT":
      return {
        ...appointments,
        data: appointments.data.filter((app) => app._id !== action.payload),
        error: null,
        successMessage: "Appointment Deleted Successfully",
      };
    case "ERROR":
      return { ...appointments, error: action.payload, successMessage: null };
    default:
      return appointments;
  }
};
