import { Box, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import TitleWithFile from './TitleWithFile';
import { Beforeunload } from 'react-beforeunload';
import { useTranslation } from 'react-i18next';

function UploadProgress(props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const { perc, fileInfo } = props;

  return <React.Fragment>
    <Beforeunload onBeforeunload={() => t("upload_page.text9")}>
      <Box textAlign="center">
        <TitleWithFile title={t("upload_page.text8")} fileInfo={fileInfo} />
      
        <Box pt={4}>
          <Typography color="textPrimary" variant="h4"
            style={{userSelect:"none", color: theme.palette.primary.main}}>
            {perc || '0'}%
          </Typography>
        </Box>
      </Box>
    </Beforeunload>
  </React.Fragment>;
}

export default UploadProgress;
