import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import MuiPhoneNumber from "material-ui-phone-number";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";

import useStyles from "./styles";

import { postAppointment, updateAppointment } from "../../actions/appointments";

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

const AppointmentForm = ({ currentId, setCurrentId, setOpen }) => {
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
    selectedFile: "",
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
      } else dispatch(postAppointment(postData));
      clear();
      setCurrentId(null);
      setOpen(true);
    }
  };
  const clear = () => {
    // Clearing the state.
    setPostData(defaultState);
    setCurrentId(null);
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='false'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>{`${
          currentId ? "Editing" : "Request"
        } an Appointment`}</Typography>
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
          label='Leave a Message with Appointment'
          fullWidth
          required={true}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          {...(error.message && { error: true, helperText: error.message })}
        />
        <div className={classes.fileInput}>
          <Typography variant='subtitle2'>
            Select your Image for Identification
          </Typography>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default AppointmentForm;
