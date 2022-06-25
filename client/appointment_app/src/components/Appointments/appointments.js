import React, { useEffect } from "react";

import { Grid, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import Doctor from './Doctors/doctor'

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { addAppointmentToDoctor } from "../../actions/doctors";

const Appointments = ({ setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const doctors = useSelector((state) => {
    return state.doctors.data
  });
  const doctorError = useSelector((state) => {
    return state.doctors.error
  })
  const doctorSuccess = useSelector((state) => {
    return state.doctors.successMessage
  })
  const appointment_list = useSelector((state) => {
    return state.doctors.appointment_list
  })

  const [open, setOpen] = React.useState(false);
  const [displaySuccess, openSuccess] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    openSuccess(false)
  };
  useEffect(() => {
    if (doctorError != '') {
      setOpen(true)
    }
  }, [doctorError])

  useEffect(() => {
    if (doctorSuccess != '') {
      openSuccess(true)
    }
  }, [doctorSuccess])

  useEffect(() => {
    if (appointment_list && appointment_list.length) {
      dispatch(addAppointmentToDoctor(appointment_list[0].doctor, appointment_list[0].appointment, appointment_list[0].patient));
    }
  }, [appointment_list])

  return !doctors.length ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      className={classes.container}
      alignItems='stretch'
      spacing={3}
    >
      {doctors.map((app, i) => (
        <Grid item key={app._id} xs={12} sm={6}>
          <Doctor doctor={app} setCurrentId={null} doc={i} />
        </Grid>
      ))}
      {doctorError &&
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={6000}
          open={open}
          onClose={handleClose}
          key={'top' + 'center'}>
          <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
            {doctorError}
          </Alert>
        </Snackbar>
      }
      {doctorSuccess &&
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={6000}
          open={displaySuccess}
          onClose={handleClose}
          key={'top' + 'center'}>
          <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
            {doctorSuccess}
          </Alert>
        </Snackbar>
      }
    </Grid>
  );
};

export default Appointments;
