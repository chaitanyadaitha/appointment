import React, { useState } from "react";

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Chip,
    Box
} from "@material-ui/core";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import useStyles from "../styles";
import { useDispatch } from "react-redux";

import Info from '@material-ui/icons/Info';

import defaultImg from "../../../assets/default.png";
import AppointmentForm from "../AppointmentForm/form";
import { postAppointment } from "../../../actions/appointments";
import DoctorInfo from "./doctorInfo";

const Doctor = ({ doctor, setCurrentId, doc }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [toggle, openModal] = useState(false);
    const [toggleInfo, openInfoModal] = useState(false);

    const bookAppointment = () => {
        openInfoModal(false)
        openModal(true)
    }

    const handleClose = () => {
        openModal(false);
        openInfoModal(false)
    };

    const handleAppointment = (data) => {
        openModal(false);
        dispatch(postAppointment(data));
    }

    const hanleDoctorInfo = (info) => {
        openInfoModal(true)
    }
    return (
        <React.Fragment>
            <Card className={`${classes.card}${classes.cursor_style}`}>
                <CardMedia
                    className={classes.media}
                    src={doctor.profile ? doctor.profile : defaultImg}
                    title={`${doctor.lastName}.${doctor.firstName}`}
                />
                <div className={classes.overlay}>
                    <Typography variant='h6' align="center">{`${doctor.lastName}.${doctor.firstName}`}</Typography>
                </div>
                <div onClick={() => hanleDoctorInfo(doctor)}>
                    <CardContent>
                        <Typography variant='h6' align="center" className={classes.details} gutterBottom>
                            <Box spacing={3}>
                                {
                                    doctor.specialities && doctor.specialities.split(',').map((sp, i) =>
                                        <Chip label={sp} key={`${sp}-i`} color="primary" className={classes.smMargin} />)
                                }
                            </Box>
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant='h6' align="center" className={classes.details} gutterBottom>
                            Appointment Timings: <span>From: {doctor.availability[0] > 12 ? `${doctor.availability[0]}PM` : `${doctor.availability[0]}AM`} To: {doctor.availability[1] > 12 ? `${doctor.availability[1]}PM` : `${doctor.availability[1]}AM`}</span>
                        </Typography>
                    </CardContent>
                </div>
                <CardActions className={classes.cardActions}>
                    <Button
                        size='small'
                        color='primary'
                        fullWidth={true}
                        onClick={() => bookAppointment()}
                    >
                        <Info fontSize='small' className={classes.smMargin} />
                        Book Appointment
                    </Button>
                </CardActions>
            </Card>
            {
                toggle && (
                    <Dialog open={toggle} onClose={handleClose}>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogContent>
                            <AppointmentForm doctor={doctor} currentId={setCurrentId} handleAppointment={handleAppointment} />
                        </DialogContent>
                    </Dialog>
                )
            }
            {
                toggleInfo && (
                    <Dialog open={toggleInfo} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
                        {/* <DialogTitle>Doctor Information</DialogTitle> */}
                        <DialogContent>
                            <DoctorInfo doctor={doctor} doc={doc} />
                        </DialogContent>
                    </Dialog>
                )
            }
        </React.Fragment>
    );
};

export default Doctor;
