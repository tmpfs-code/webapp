import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

function ExpiredLink(props) {
  const { t } = useTranslation();

  return <React.Fragment>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {t('link_expired')}
      </Typography>
      <Typography color="textPrimary">
        <Trans i18nKey="link_expired_hint" />
      </Typography>
    </Box>
  </React.Fragment>;
}

export default ExpiredLink;
