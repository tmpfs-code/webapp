import { Box, Typography } from '@material-ui/core';
import Check from '@material-ui/icons/CheckOutlined';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FileInfo from './FileInfoBig';

function DownloadCompleted(props) {
  const { t } = useTranslation();
  const { filename, filesize } = props;

  return <React.Fragment>
    <Box textAlign="center">
      <FileInfo
        name={filename}
        size={filesize}
      />

      <Box mt={4}>
        <Typography gutterBottom={true} color="textSecondary">
          {t('download_completed')}
        </Typography>
      </Box>
        
      <Box mt={4}>
        <Check color="primary" fontSize={"large"}/>
      </Box>
    </Box>
  </React.Fragment>;
}

export default DownloadCompleted;
