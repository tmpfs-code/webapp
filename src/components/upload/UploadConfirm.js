import { Box, ListSubheader, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import prettyMilliseconds from 'pretty-ms';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getGitHubLink, GIT_COMMIT_HASH, LIFETIMES, MAX_DOWNLOADS } from '../../constants';
import { getFilesizeRange } from '../../payments';
import { requestUploadPrice, shouldRequestUploadPrice } from '../../upload-price';
import ErrorDialog from '../ErrorDialog';
import RoundBtn from '../shared/RoundBtn';
import CurrencySelect from './CurrencySelect';
import PayButton from './PayButton';
import TitleWithFile from './TitleWithFile';

const useStyles = makeStyles(theme => ({
  expirationPolicySelect: {
    marginLeft: "0.5em",
    marginRight: "0.5em",
    paddingRight: "0.15em",
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  legalWarn: {
    fontSize: "0.8em",
    color: theme.palette.text.secondary,
    marginTop: "2em",
  },
  button: {
    "& button:hover .MuiFab-primary": {
      backgroundColor: "#fff !important",
      color: "red",
      // transition: "0.4s",
    }
  },
}));

function MaxDownloadsLabel({value, free}) {
  const { t } = useTranslation();
  return `${value} ${t('download', {count: value})}`;
}

function LifetimeLabel({value, free}) {
  const { t } = useTranslation();
  return prettyMilliseconds(value*1000, {compact: true, verbose: true});
}

function UploadConfirm({fileInfo, confirmUpload}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [ errDialogProps, setErrDialogProps ] = React.useState({});
  const [ price, setPrice ] = React.useState(null);
  const [ payButtonBusy, setPayButtonBusy ] = React.useState(false);

  const [ uploadOpts, setUploadOpts ] = React.useState({
    maxDownloads: Object.keys(MAX_DOWNLOADS)[10],
    lifetime: Object.keys(LIFETIMES)[2],
    filesizeRange: -1,
    currency: 'eth',
  });

  const mergeUploadOpts = (obj) => setUploadOpts({...uploadOpts, ...obj});

  React.useEffect(() => {
    if (fileInfo && fileInfo.ready) {
      mergeUploadOpts({
        filesizeRange: getFilesizeRange(fileInfo.loadedBytes),
      });
    }
  }, [fileInfo]);

  React.useEffect(() => {
    if (!shouldRequestUploadPrice({...uploadOpts})) {
      setPrice(null);
      return
    }

    setPrice({isFetching: true});

    requestUploadPrice({...uploadOpts})
      .then(resp => setPrice(resp))
      .catch(err => setErrDialogProps({open: true, message: t('errors.generic_error')}));
  }, [uploadOpts]);

  return <React.Fragment>
    <ErrorDialog
      onClose={() => setErrDialogProps({open: false})}
      {...errDialogProps}
    />

    <Box textAlign="center">
      <TitleWithFile title={t('expiration_policy')} fileInfo={fileInfo} />

      <Box pt={3}>
        <Typography display="inline" color="textPrimary">
          {t('expire_after')}
        </Typography>

        <Select value={uploadOpts.maxDownloads}
          disabled={payButtonBusy}
          onChange={e => mergeUploadOpts({maxDownloads: e.target.value})}
          className={classes.expirationPolicySelect}>
            
          {Object.values(MAX_DOWNLOADS).filter(obj => obj.free).map(obj =>
            <MenuItem value={obj.value} key={obj.value}>
              <MaxDownloadsLabel {...obj} />
            </MenuItem>  
          )}

          <ListSubheader>{t('paid_options')}</ListSubheader>

          {Object.values(MAX_DOWNLOADS).filter(obj => !obj.free).map(obj =>
            <MenuItem value={obj.value} key={obj.value}>
              <MaxDownloadsLabel {...obj} />
            </MenuItem>  
          )}
        </Select>

        <Typography display="inline" color="textPrimary">
          {t('or')}
        </Typography>

        <Select value={uploadOpts.lifetime}
          disabled={payButtonBusy}
          onChange={e => mergeUploadOpts({lifetime: e.target.value})}
          className={classes.expirationPolicySelect}>

          {Object.values(LIFETIMES).filter(obj => obj.free).map(obj =>
            <MenuItem value={obj.value} key={obj.value}>
              <LifetimeLabel {...obj} />
            </MenuItem>  
          )}
          
          <ListSubheader>{t('paid_options')}</ListSubheader>

          {Object.values(LIFETIMES).filter(obj => !obj.free).map(obj =>
            <MenuItem value={obj.value} key={obj.value}>
              <LifetimeLabel {...obj} />
            </MenuItem>  
          )}
        </Select>
      </Box>

      <Box pt={4}>   
        {price && <React.Fragment>
            <Box mb={2}>
              <CurrencySelect
                disabled={payButtonBusy}
                price={price}
                onChange={(c) => mergeUploadOpts({currency: c})}
              />
            </Box>
            <PayButton 
              price={price}
              uploadOpts={uploadOpts}
              disabled={!fileInfo.ready}
              onPaymentConfirmed={(resp) => confirmUpload({...uploadOpts, fileId: resp.id})}
              onBusy={(value) => setPayButtonBusy(value)}
            />
          </React.Fragment>
        }
        
        {!price && 
          <RoundBtn
            disabled={fileInfo.ready ? false : true}
            onClick={() => confirmUpload({...uploadOpts})}
            tooltip={t('start_upload')}
            icon={<PublishIcon />}
          />
        }
      </Box>

      <Box>
        <Typography className={classes.legalWarn}>
          <Trans
            i18nKey="by_using_this"
            components={[
              <a className={classes.link} target="_blank" href={getGitHubLink(GIT_COMMIT_HASH, '/legal/terms.md')} />,
              <a className={classes.link} target="_blank" href={getGitHubLink(GIT_COMMIT_HASH, '/legal/privacy.md')} />,
            ]}
          />
        </Typography>
      </Box>
    </Box>
  </React.Fragment>;
}

export default UploadConfirm;
