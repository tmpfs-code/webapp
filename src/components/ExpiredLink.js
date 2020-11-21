import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

function ExpiredLink(props) {
  const { t } = useTranslation();

  return <React.Fragment>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {t('download_page.text6')}
      </Typography>
      <Typography color="textPrimary">
        <Trans i18nKey="download_page.text7" />
      </Typography>
    </Box>
  </React.Fragment>;
}

export default ExpiredLink;
