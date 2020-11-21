import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  button: {
    "&:hover": {
      backgroundColor: theme.custom.bgColor,
      color: theme.custom.bgTextColor1,
      transition: "0.3s",
    }
  },
}));

function RoundBtn(props) {
  const classes = useStyles();
  const { disabled, onClick, tooltip, icon} = props;

  if (!icon) {
    throw new Error("RoundBtn: icon prop is mandatory");
  }

  return <Tooltip title={tooltip || ''} placement="bottom" enterDelay={600}>
    <Fab
      disabled={disabled ? true : false}
      color="primary"
      className={classes.button}
      onClick={onClick}
    >
    {icon}
    </Fab>
  </Tooltip>;
}

export default RoundBtn;
