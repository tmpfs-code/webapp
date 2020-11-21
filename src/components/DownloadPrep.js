import { Box, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

function DownloadPrep(props) {
  const { t } = useTranslation();

  return <React.Fragment>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {t('download_page.text0')}
      </Typography>
      <Typography color="textPrimary">
        {t('download_page.text1')}
      </Typography>
      <Box mt={3}>
        <CircularProgress size={24}/>
      </Box>
    </Box>
  </React.Fragment>;
}

export default DownloadPrep;
