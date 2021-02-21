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

const AppointmentForm = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  const dateClasses = dateStyles();
  const dispatch = useDispatch();

  const appointment = useSelector((state) =>
    currentId ? state.appointments.find((p) => p._id == currentId) : null
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateAppointment(currentId, postData));
    } else dispatch(postAppointment(postData));

    clear();
    setCurrentId(null);
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
        />
        <TextField
          name='place'
          variant='outlined'
          label='City'
          fullWidth
          required={true}
          value={postData.place}
          onChange={(e) => setPostData({ ...postData, place: e.target.value })}
        />
        <MuiPhoneNumber
          name='phoneNumber'
          onlyCountries={["in"]}
          defaultCountry={"in"}
          required={true}
          value={postData.phoneNumber}
          onChange={(e) => setPostData({ ...postData, phoneNumber: e })}
          fullWidth
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
