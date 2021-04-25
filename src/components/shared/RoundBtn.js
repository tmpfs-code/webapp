import { CircularProgress, Fab, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  button: {
    "&:hover": {
      backgroundColor: theme.custom.bgColor,
      color: theme.themeName === 'light' ? theme.palette.secondary.light : theme.custom.bgTextColor1,
      transition: "0.3s",
    }
  },
  textPadding: {
    paddingLeft: "0.5em",
    paddingRight: "0.1em",
  }
}));

function RoundBtn({ disabled, onClick, tooltip, icon, text, loading }) {
  const classes = useStyles();

  if (!icon) {
    throw new Error("RoundBtn: icon prop is mandatory");
  }

  return <Tooltip title={tooltip || ''} placement="right" enterDelay={100}>
    <Fab
      disabled={disabled ? true : false}
      color="primary"
      style={text ? {marginBottom: "8px"} : {}}
      variant={text ? "extended" : "round"}
      className={classes.button}
      onClick={onClick}
    >
    {loading ? <CircularProgress size={24} /> : icon}
    {text ? <span className={classes.textPadding}>{text}</span> : null}
    </Fab>
  </Tooltip>;
}

export default RoundBtn;
