import { Box, Typography } from '@material-ui/core';
import Check from '@material-ui/icons/CheckOutlined';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FileInfo from './FileInfo';

function DownloadCompleted(props) {
  const { t } = useTranslation();
  const { filename, filesize } = props;

  return <React.Fragment>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {t('download_page.text5')}
      </Typography>
      <Typography color="textPrimary">
        {t('download_page.text1')}
      </Typography>
      <Box mt={3}>
        <FileInfo
          name={filename}
          size={filesize}
        />
      </Box>
      <Box mt={2}>
        <Check color="primary" fontSize={"large"}/>
      </Box>
    </Box>
  </React.Fragment>;
}

export default DownloadCompleted;
