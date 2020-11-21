import { Box, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FileInfo from './FileInfo';
import RoundBtn from './RoundBtn';

function DownloadReady(props) {
  const { t } = useTranslation();
  const { filename, filesize, onStartClick } = props;

  return <React.Fragment>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {t('download_page.text0')}
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
        <RoundBtn
          tooltip={t('download_page.text2')}
          onClick={() => onStartClick()}
          icon={<GetAppIcon />}
        />
      </Box>
    </Box>
  </React.Fragment>;
}

export default DownloadReady;
