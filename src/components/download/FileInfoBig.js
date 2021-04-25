import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Filesize from '../shared/Filesize';

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
    <Typography title={name} variant="h5" className={classes.filename}>
      {truncName}
    </Typography>
    
    <Filesize bytes={size} />
  </Box>
}

export default FileInfo;
