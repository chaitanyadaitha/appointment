export default (appointments = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE_APPOINTMENT":
      return [...appointments, action.payload];
    case "UPDATE_APPOINTMENT":
      return appointments.map((app) =>
        app._id == action.payload._id ? action.payload : app
      );
    case "DELETE_APPOINTMENT":
      return appointments.filter((app) => app._id !== action.payload);
    default:
      return appointments;
  }
};
