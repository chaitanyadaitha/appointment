import React, { useState, useEffect } from "react";

import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

import { useDispatch } from "react-redux";

import { getAppointments } from "./actions/appointments";

import Appointments from "./components/Appointments/appointments";

import AppointmentForm from "./components/AppointmentForm/form";

import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getAppointments());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography variant='h4' align='center' className={classes.heading}>
          Sri Gayatri Jyothisya Nilayam
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Appointments setCurrentId={setCurrentId}></Appointments>
            </Grid>

            <Grid item xs={12} sm={4}>
              <AppointmentForm
                currentId={currentId}
                setCurrentId={setCurrentId}
              ></AppointmentForm>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
