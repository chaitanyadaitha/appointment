import React from "react";

import { Grid, CircularProgress } from "@material-ui/core";

import Appointment from "./Appointment/appointment";

import { useSelector } from "react-redux";

import useStyles from "./styles";

const Appointments = ({ setCurrentId }) => {
  const classes = useStyles();
  const appointments = useSelector((state) => state.appointments);

  return !appointments.length ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      className={classes.container}
      alignItems='stretch'
      spacing={3}
    >
      {appointments.map((app) => (
        <Grid item key={app._id} xs={12} sm={6}>
          <Appointment appointment={app} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Appointments;
