import { Box, Button, OutlinedInput, useTheme } from '@material-ui/core';
import copy from "copy-to-clipboard";
import QRCode from "qrcode.react";
import React from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithFile from './TitleWithFile';

function UploadCompleted(props) {
  const theme = useTheme();
  const [ qrCodeVisible, setQrCodeVisible ] = React.useState(false);
  const { t } = useTranslation();
  const { fileInfo, url } = props;

  let urlWithHostname = `${document.location.protocol}//${document.location.host}${url}`;

  return <React.Fragment>
    <Box textAlign="center">
      <TitleWithFile title={t('file_ready')} fileInfo={fileInfo} />
    
      <Box mt={3}>
        <OutlinedInput
          type="text"
          size="large"
          readOnly={true}
          variant="outlined"
          value={urlWithHostname}
          fullWidth
          multiline
        />
        <Box mt={1}>
          <Button color="primary" onClick={() => copy(urlWithHostname)}>
            {t('copy')}
          </Button>
          <Button color="primary" onClick={() => setQrCodeVisible(qrCodeVisible ? false : true)}>
            {t('qrcode')}
          </Button>
        </Box>
      </Box>

      {qrCodeVisible && <Box mt={3}>
        <QRCode 
          value={urlWithHostname}
          size={164}
          level="M"
          renderAs="svg" 
          fgColor={theme.custom.qrCodeColor}
          bgColor="transparent"
        />
      </Box>}
    </Box>
  </React.Fragment>;
}

export default UploadCompleted;
