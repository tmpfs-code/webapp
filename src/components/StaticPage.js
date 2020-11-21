
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  content: {
    color: theme.custom.bgTextColor2,
    marginBottom: "4em",
  },
}));

function StaticPage(props) {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item md={6} sm={8} xs={11} className={classes.content}>
        {props.children}
      </Grid>
    </Grid>
  );
}

export default StaticPage;
