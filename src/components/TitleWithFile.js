import { Box, Typography } from '@material-ui/core';
import React from 'react';
import FileInfo from './FileInfo';


function TitleWithFile(props) {
  const { fileInfo, title } = props;

  return <Box>
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {title}
      </Typography>
      <FileInfo name={fileInfo.name} size={fileInfo.size} />
  </Box>;
}

export default TitleWithFile;
