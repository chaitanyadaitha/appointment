import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
import path from 'path';
import mongoose from "mongoose";
import Doctors from "../models/doctorsSchema.js";

let file = path.resolve(__dirname, "../mock_json/doctors.json")
export const getDoctors = async (req, res) => {
    try {
        let doctors = await Doctors.find();
        res.status(200).json(doctors)
    } catch (error) {
        res.status(404).json('Doctors Not Found');
    }
};

export const addAppointment = async (req, res) => {
    const list = req.body;
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No Doctor with that ID");
        let master_doctor = await Doctors.findById(_id);
        let updated_list = [...master_doctor.appointments, list];
        const updatedDoctor = await Doctors.findByIdAndUpdate(
            _id,
            { appointments: updated_list },
            { new: true }
        );
        res.json(updatedDoctor)
    } catch (error) {
        res.status(404).json('Doctors Not Found');
    }
}
