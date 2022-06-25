import mongoose from "mongoose";

const doctorsSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    specialities: String,
    availability: {
        type: Array,
        default: [9, 13],
    },
    profile: String,
    cost: Number,
    appointments: {
        type: Array,
        default: []
    }
});

const DoctorsSchema = mongoose.model(
    "DoctorsSchema",
    doctorsSchema
);

export default DoctorsSchema;
