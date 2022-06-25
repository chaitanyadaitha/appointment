import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import MuiPhoneNumber from "material-ui-phone-number";

import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from "./styles";

import { updateAppointment } from "../../../actions/appointments";

const dateStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: "0px",
    width: "100%",
  },
}));

const AppointmentForm = ({ doctor, currentId, handleAppointment }) => {
  const classes = useStyles();

  const dateClasses = dateStyles();
  const dispatch = useDispatch();

  const appointment = useSelector((state) =>
    currentId ? state.appointments.data.find((p) => p._id == currentId) : null
  );

  useEffect(() => {
    if (currentId && appointment) {
      appointment.doa = moment(appointment.doa).format("yyyy-MM-DDThh:mm");
      setPostData(appointment);
    }
  }, [appointment]);
  const defaultState = {
    firstName: "",
    lastName: "",
    message: "",
    doa: "",
    phoneNumber: "",
    place: "",
    doctor: doctor._id
  };

  const [postData, setPostData] = useState(defaultState);
  const [error, setErrors] = useState({});

  const validate = () => {
    let err = {};
    err.firstName = postData.firstName ? "" : "This Field is Required";
    err.lastName = postData.lastName ? "" : "This Field is Required";
    err.message = postData.message ? "" : "This Field is Required";
    err.doa = postData.doa ? "" : "Please select an appointment date";
    err.place = postData.place ? "" : "This Field is Required";
    err.phoneNumber = postData.phoneNumber ? "" : "This Field is Required";

    setErrors({
      ...err,
    });

    return Object.values(err).every((val) => val == "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (currentId) {
        dispatch(updateAppointment(currentId, postData));
      } else handleAppointment(postData);
      clear();
    }
  };
  const clear = () => {
    setPostData(defaultState);
  };
  return (
    <>
      {doctor && doctor.firstName && (<span>Doctor: {doctor.firstName}</span>)}
      <form
        autoComplete='false'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <TextField
          name='firstName'
          variant='outlined'
          label='First Name'
          fullWidth
          required={true}
          value={postData.firstName}
          onChange={(e) =>
            setPostData({ ...postData, firstName: e.target.value })
          }
          {...(error.firstName && { error: true, helperText: error.firstName })}
        />
        <TextField
          name='lastName'
          variant='outlined'
          label='Last Name'
          fullWidth
          required={true}
          value={postData.lastName}
          onChange={(e) =>
            setPostData({ ...postData, lastName: e.target.value })
          }
          {...(error.lastName && { error: true, helperText: error.lastName })}
        />
        <TextField
          name='place'
          variant='outlined'
          label='City'
          fullWidth
          required={true}
          value={postData.place}
          onChange={(e) => setPostData({ ...postData, place: e.target.value })}
          {...(error.place && { error: true, helperText: error.place })}
        />
        <MuiPhoneNumber
          name='phoneNumber'
          onlyCountries={["in"]}
          defaultCountry={"in"}
          required={true}
          value={postData.phoneNumber}
          onChange={(e) => setPostData({ ...postData, phoneNumber: e })}
          fullWidth
          {...(error.phoneNumber && {
            error: true,
            helperText: error.phoneNumber,
          })}
        />
        <TextField
          id='datetime-local'
          name='doa'
          label='Appointment Date & Time'
          type='datetime-local'
          value={postData.doa}
          required={true}
          className={dateClasses.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setPostData({ ...postData, doa: e.target.value })}
          {...(error.doa && { error: true, helperText: error.doa })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Describe yout reason for appointment'
          fullWidth
          required={true}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          {...(error.message && { error: true, helperText: error.message })}
        />
        <div className={classes.margin_t}>
          <Button
            className={`${classes.buttonSubmit} ${classes.margin_r}`}
            variant='contained'
            color='primary'
            size='large'
            type='submit'
          >
            Submit
          </Button>
          <Button
            className={classes.buttonSubmit}
            variant='contained'
            color='secondary'
            size='large'
            onClick={clear}
          >
            Clear
          </Button>
        </div>
      </form>
    </>
  );
};

export default AppointmentForm;
