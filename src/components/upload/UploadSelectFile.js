import { Box, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RoundBtn from '../shared/RoundBtn';
import prettyBytes from "pretty-bytes";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_FREE } from '../../constants';

function UploadSelectFile(props) {
  const { t } = useTranslation();
  const { fileInputRef } = props;

  return <React.Fragment>
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom={true} color="textPrimary">
        {t('select_file')}
      </Typography>
      <Typography color="textPrimary">
        {t('up_to_size', {freeSize: prettyBytes(MAX_FILE_SIZE_FREE), size: prettyBytes(MAX_FILE_SIZE)})}
      </Typography>
    </Box>
    <Box textAlign="center" mt={3}>
      <RoundBtn
        icon={<AddIcon />}  
        onClick={(e) => fileInputRef.current.click()}
      />
    </Box>
  </React.Fragment>;
}

export default UploadSelectFile;
