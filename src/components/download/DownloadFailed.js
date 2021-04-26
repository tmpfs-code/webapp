import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

function DownloadFailed(props) {
  const { t } = useTranslation();

  return <React.Fragment>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {t("errors.download_failed")}
      </Typography>
      <Typography color="textPrimary">
        <Trans i18nKey="errors.download_failed_hint" />
      </Typography>
    </Box>
  </React.Fragment>;
}

export default DownloadFailed;
