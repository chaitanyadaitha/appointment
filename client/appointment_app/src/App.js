import React, { useState, useEffect } from "react";

import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Snackbar,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";

import { getAppointments } from "./actions/appointments";

import Appointments from "./components/Appointments/appointments";

import useStyles from "./styles";
import { getDoctors } from "./actions/doctors";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [openSnackBar, setOpen] = useState(false);

  const error = useSelector((state) => state.appointments.error);
  const successMessage = useSelector(
    (state) => state.appointments.successMessage
  );

  useEffect(() => {
    if (!error) {
      dispatch(getDoctors());
      dispatch(getAppointments());
    }
    else setOpen(true);
  }, [currentId, dispatch]);

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography variant='h4' align='center' className={classes.heading}>
          Apollo Doctor's Appointment
        </Typography>
      </AppBar>
      {(error || successMessage) && (
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackBar}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={`${error ? "error" : "success"}`}
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
      )}
      <Grow in>
        <Container>
          <Grid
            container
            justify='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <Grid item xs={12} sm={12}>
              <Appointments setCurrentId={setCurrentId}></Appointments>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
