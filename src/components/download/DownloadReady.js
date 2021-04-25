import { Box, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import prettyMilliseconds from "pretty-ms";
import React from 'react';
import { useTranslation } from 'react-i18next';
import RoundBtn from '../shared/RoundBtn';
import FileInfo from './FileInfoBig';

function DownloadReady({ filename, filesize, dwnLeft, timeLeft, onStartClick }) {
  const { t } = useTranslation();

  return <React.Fragment>
    <Box textAlign="center">
      <FileInfo
        name={filename}
        size={filesize}
      />
      <Box mt={3}>
        <Typography color="textSecondary">
          {t('expire_details', {
            timeLeft: prettyMilliseconds(timeLeft*1000, {compact: true, verbose: true}),
            dwnLeft: dwnLeft,
            download: t(dwnLeft > 1 ? 'download_plural' : 'download'),
          })}
        </Typography>
      </Box>
      <Box mt={3}>
        <RoundBtn
          tooltip={t('start_download')}
          onClick={() => onStartClick()}
          icon={<GetAppIcon />}
        />
      </Box>
    </Box>
  </React.Fragment>;
}

export default DownloadReady;
