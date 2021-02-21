import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import PhoneAndroidRoundedIcon from "@material-ui/icons/PhoneAndroidRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";

import useStyles from "./styles";
import { useDispatch } from "react-redux";

import { deleteAppointment } from "../../../actions/appointments";

import moment from "moment";

const Appointment = ({ appointment, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={appointment.selectedFile}
        title={`${appointment.firstName} - ${appointment.lastName}`}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{`${appointment.firstName} - ${appointment.lastName}`}</Typography>
        <Typography variant='body2'>
          {moment(appointment.doa).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size='small'
          onClick={() => setCurrentId(appointment._id)}
        >
          <Edit fontSize='default' />
        </Button>
      </div>
      <div className={`${classes.overlay3}`}>
        <Typography variant='h6'>
          <PhoneAndroidRoundedIcon fontSize='small' />{" "}
          {`${appointment.phoneNumber}`}
        </Typography>
        <Typography variant='h6'>
          <LocationOnRoundedIcon fontSize='small' /> {`${appointment.place}`}
        </Typography>
      </div>
      <CardContent>
        <Typography variant='h5' className={classes.details} gutterBottom>
          {appointment.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => dispatch(deleteAppointment(appointment._id))}
        >
          <DeleteIcon fontSize='small' />
          Delete Appointment
        </Button>
      </CardActions>
    </Card>
  );
};

export default Appointment;
