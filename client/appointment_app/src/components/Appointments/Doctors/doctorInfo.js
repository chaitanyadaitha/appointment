import React, { useState, useEffect } from "react";

import { Grid, TableContainer, Table, TableBody, TableRow, Box, TableCell, Paper, TableHead, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import useStyles from "../styles";

const DoctorInfo = ({ doctor, doc }) => {
    const classes = useStyles();

    return (
        <>
            <Grid
                container
                className={classes.container}
                alignItems='stretch'
                spacing={2}
            >
                {/* {doctors.map((app) => ( */}
                <Grid item key={doctor.firstName} xs={12} sm={6}>
                    <Typography align="center" variant="h6">{doctor.firstName}</Typography>
                    <Grid xs={12} sm={6}>
                        <Paper>
                            <img src={`/${doc + 1}.jpg`} />
                        </Paper>
                    </Grid>
                </Grid>
                {/* ))} */}
                <Grid item key={doctor.appointments} xs={12} sm={6}>
                    {doctor.appointments && doctor.appointments.length ?
                        <>
                            <Typography variant='h6' align="center" className={classes.details}>
                                Appointments
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Patients</TableCell>
                                            <TableCell align="right">Appointment Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {doctor.appointments.map((row) => (
                                            <TableRow
                                                key={row.time}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.patient}
                                                </TableCell>
                                                <TableCell align="right" component="th" scope="row">
                                                    Appointment scheduled on {row.time}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </> : <><Typography align="right" variant="h5">No Appointments..</Typography></>
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default DoctorInfo;
