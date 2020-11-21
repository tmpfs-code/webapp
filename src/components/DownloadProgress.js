import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FileInfo from './FileInfo';
import { Beforeunload } from 'react-beforeunload';

function DownloadProgress(props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { filename, filesize, perc } = props;

  return <React.Fragment>
    <Beforeunload onBeforeunload={() => t('download_page.text4')}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom={true} color="textPrimary">
          {t('download_page.text3')}
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
          <Typography color="textPrimary" variant="h4" style={{userSelect:"none", color: theme.palette.primary.main}}>
            {perc || '0'}%
          </Typography>
        </Box>
      </Box>
    </Beforeunload>
  </React.Fragment>;
}

export default DownloadProgress;
