import { Box, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

function DownloadPrep(props) {
  const { t } = useTranslation();

  return <React.Fragment>
    <Box textAlign="center">
      <Box mt={1} mb={4}>
        <Typography color="textPrimary" variant="h5">
          {t('loading_file')}
        </Typography>
      </Box>

      <Box>
        <CircularProgress size={24}/>
      </Box>
    </Box>
  </React.Fragment>;
}

export default DownloadPrep;
