export default (
    doctors = { data: [], error: null, successMessage: null },
    action
) => {
    switch (action.type) {
        case "FETCH_ALL_DOCTORS":
            return { ...doctors, data: action.payload };
        case "ADD_APPOINTMENT_TO_DOCTOR":
            return { ...doctors, appointment_list: action.payload };
        case "ADDED_APPOINTMENT":
            return {
                ...doctors,
                data: [
                    ...doctors.data.map((app) =>
                        app._id == action.payload._id ? action.payload : app
                    ),
                ],
                error: null,
                successMessage: 'Appointments successfull created.'
            }
        case "ERROR":
            return { ...doctors, error: action.payload, successMessage: null };
        default:
            return doctors;
    }
};
