import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

function InvalidKey(props) {
  const { t } = useTranslation();

  return <React.Fragment>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {t('errors.text5')}
      </Typography>
      <Typography color="textPrimary">
        <Trans i18nKey={"errors.text6"} />
      </Typography>
    </Box>
  </React.Fragment>;
}

export default InvalidKey;
