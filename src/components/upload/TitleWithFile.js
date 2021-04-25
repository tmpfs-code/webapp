import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Filesize from '../shared/Filesize';

const useStyles = makeStyles({
  filename: {
    lineBreak: "anywhere",
    whiteSpace: "break-spaces",
  }
});

function TitleWithFile({ fileInfo, title }) {
  const classes = useStyles();
  const { name, size } = fileInfo;
  const truncName = (name+'').length > 80 ? (name+'').substr(0, 60).trim() + "..." : name;

  return <Box>
    <Typography variant="h4" gutterBottom={true} color="textPrimary">
      {title}
    </Typography>
    
    <Typography title={name} color="textSecondary" className={classes.filename}>
      {truncName}
    </Typography>
    
    <Filesize bytes={size} />
  </Box>;
}

export default TitleWithFile;
