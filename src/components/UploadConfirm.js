import { Box, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RoundBtn from './RoundBtn';
import TitleWithFile from './TitleWithFile';

const useStyles = makeStyles({
  expirationPolicySelect: {
    marginLeft: "0.5em",
    marginRight: "0.5em",
    paddingRight: "0.15em",
  },
  cancelLink: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  button: {
    "& button:hover .MuiFab-primary": {
      backgroundColor: "#fff !important",
      color: "red",
      // transition: "0.4s",
    }
  },
});

function UploadConfirm(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { fileInfo, confirmUpload } = props;


  const allMaxDownloads = {
    1:   `1 ${t('download', {count: 1})}`,
    10:  `10 ${t('download', {count: 2})}`,
    100: `100 ${t('download', {count: 2})}`,
  }
  
  const allLifetimes = {
    600:    `10 ${t('minute', {count: 2})}`,
    3600:   `1 ${t('hour')}`,
    7200:   `2 ${t('hour', {count: 2})}`,
    21600:  `6 ${t('hour', {count: 2})}`,
    43200:  `12 ${t('hour', {count: 2})}`,
  }
  
  const [maxDownloads, setMaxDownloads] = React.useState(Object.keys(allMaxDownloads)[0]);
  const [lifetime, setLifetime] = React.useState(Object.keys(allLifetimes)[1]);

  return <React.Fragment>
    <Box textAlign="center">
      <TitleWithFile title={t('upload_page.text4')} fileInfo={fileInfo} />

      <Box pt={3}>
        <Typography display="inline" color="textPrimary">
          {t('upload_page.text6')}
        </Typography>

        <Select value={maxDownloads} onChange={e => setMaxDownloads(e.target.value)} className={classes.expirationPolicySelect}>
          {Object.keys(allMaxDownloads).map(k =>
            <MenuItem value={k} key={k}>{allMaxDownloads[k]}</MenuItem>  
          )}
        </Select>

        <Typography display="inline" color="textPrimary">
        {t('upload_page.text7')}
        </Typography>

        <Select value={lifetime} onChange={e => setLifetime(e.target.value)} className={classes.expirationPolicySelect}>
          {Object.keys(allLifetimes).map(k =>
            <MenuItem value={k} key={k}>{allLifetimes[k]}</MenuItem>  
          )}
        </Select>
      </Box>
      
      <Box pt={4}>
        <RoundBtn
          disabled={fileInfo.ready ? false : true}
          onClick={() => confirmUpload({maxDownloads: maxDownloads, lifetime: lifetime})}
          tooltip={t('upload_page.text5')}
          icon={<TelegramIcon />}
        />
      </Box>
    </Box>
  </React.Fragment>;
}

export default UploadConfirm;
