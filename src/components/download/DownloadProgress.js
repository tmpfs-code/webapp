import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FileInfo from './FileInfoBig';
import { Beforeunload } from 'react-beforeunload';

function DownloadProgress(props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { filename, filesize, perc } = props;

  return <React.Fragment>
    <Beforeunload onBeforeunload={() => t('ask_interrupt_download')}>
      <Box textAlign="center">
        <FileInfo
          name={filename}
          size={filesize}
        />
        
        <Box mt={4}>
          <Typography gutterBottom={true} color="textSecondary">
            {t('downloading')}
          </Typography>
        </Box>
        
        <Box mt={4}>
          <Typography color="textPrimary" variant="h4" style={{userSelect:"none", color: theme.palette.primary.main}}>
            {perc || '0'}%
          </Typography>
        </Box>
      </Box>
    </Beforeunload>
  </React.Fragment>;
}

export default DownloadProgress;
