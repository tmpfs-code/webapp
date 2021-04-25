import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  button: {
    "&:hover": {
      backgroundColor: theme.custom.bgColor,
      color: theme.custom.bgTextColor1,
      transition: "0.3s",
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function Btn(props) {
  const classes = useStyles();

  const {
    disabled,
    onClick,
    tooltip,
    loading
  } = props;

  return <div className={classes.root}>
    <div className={classes.wrapper}>
      <Button
        disabled={(disabled || loading) ? true : false}
        color="primary"
        title={tooltip || ''}
        variant="contained"
        className={classes.button}
        onClick={onClick}
      >
        {props.children}
      </Button>

      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  </div>;
}

export default Btn;
