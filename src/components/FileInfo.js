import { Box, makeStyles, Typography } from '@material-ui/core';
import prettyBytes from "pretty-bytes";
import React from 'react';

const useStyles = makeStyles({
  filename: {
    lineBreak: "anywhere",
    whiteSpace: "break-spaces",
  }
});

function FileInfo(props) {
  const classes = useStyles();
  const { name, size } = props;
  let truncName = (name+'').length > 80 ? (name+'').substr(0, 60).trim() + "..." : name;

  return <Box>
    <Typography title={name} color="textSecondary" className={classes.filename}>
      {truncName}
    </Typography>
    <Typography color="textSecondary" title={size ? `${size} bytes` : ''}>
      <b>{size ? prettyBytes(size) : <span>&nbsp;</span>}</b>
    </Typography>
  </Box>
}

export default FileInfo;
