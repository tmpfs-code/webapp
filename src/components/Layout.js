
import { Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Footer from './Footer';
import TopBar from './TopBar';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    cursor: "default",
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.custom.bgColor,
  },

  middleSection: {
    textAlign: "center",
    margin: "4em 0",
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {  
      margin: "2em 0",
    },
  },
  
  topSection: {
    padding: "3em",
    [theme.breakpoints.down('sm')]: {  
      padding: "1.5em",
    },
  },
}));

export default function Layout({top, middle}) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <TopBar />

      <React.Fragment>
        <Grid container justify="center">
          <Grid item md={7} sm={10} xs={11}>
            <Paper className={classes.topSection} square={false} elevation={3}>
              {top}
            </Paper>
          </Grid>
        </Grid>

        <Grid container justify="center" className={classes.middleSection}>
          <Grid item md={7} sm={10} xs={11}>
            {middle && middle}
          </Grid>
        </Grid>
      </React.Fragment>

      <Grid container justify="center">
        <Grid item md={7} sm={10} xs={11}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};
