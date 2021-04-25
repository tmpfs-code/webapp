
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
    marginBottom: "3em",
    [theme.breakpoints.down('sm')]: {  
      marginBottom: "2em",
    },
  },
  appTitle: {
    cursor: "pointer",
    color: theme.custom.bgTextColor1,
    fontSize: "1.5rem",
    display: "inline-block",
    "& em": {
      color: theme.palette.primary.dark,
      textDecorationColor: theme.palette.primary.main,
      fontStyle: "normal !important",
    },
  },
}));

function TopBar() {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={11}>
        <Box align="center">
          <Typography className={classes.appTitle} onClick={() => document.location.href = "/"}>
            tmp<em>fs</em>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default TopBar;
