import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getGitHubLink, GIT_COMMIT_HASH } from '../../constants';
import CookieIcon from '../../icons/cookie.svg';
import EthereumIcon from '../../icons/ethereum.svg';
import ProtectionIcon from '../../icons/protection.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row", 
    justifyContent: "space-between",

    [theme.breakpoints.down('md')]: {
      flexDirection: "column" 
    },
  },
  card: {
    margin: "1em",
    "&:first-child": {
      marginLeft: "0em",
    },
    "&:last-child": {
      marginRight: "0em",
    },
    [theme.breakpoints.down('md')]: {
      margin: "1em 0em !important",
    },
  },
  cardActionArea: {
    justifyContent: "center",
  },
  cardTopImage: {
    height: 100,
    marginTop: "1em",
  }
}));

function CardTopImage({src}) {
  const classes = useStyles();
  return <img src={src} className={classes.cardTopImage} />
}

function Card1() {
  const classes = useStyles();

  return <Card className={classes.card}>
    <CardTopImage src={CookieIcon} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        <Trans i18nKey={'no_tracking'} />
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <Trans i18nKey={'no_tracking_text'} />
      </Typography>
    </CardContent>
  </Card>;
}

function Card2() {
  const { t } = useTranslation();
  const classes = useStyles();

  return <Card className={classes.card}>
    <CardTopImage src={ProtectionIcon} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        <Trans i18nKey={'end_to_end'} />
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <Trans i18nKey={'end_to_end_text'} />
      </Typography>
    </CardContent>
    <CardActions className={classes.cardActionArea}>
      <Button size="small" color="primary" onClick={() => window.open(getGitHubLink(GIT_COMMIT_HASH), '_blank')}>
        {t('review_source_code')}
      </Button>
    </CardActions>
  </Card>;
}

function Card3() {
  const classes = useStyles();

  return <Card className={classes.card}>
    <CardTopImage src={EthereumIcon} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        <Trans i18nKey={'pay_cryto'} />
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <Trans i18nKey={'pay_cryto_text'} />
      </Typography>
    </CardContent>
  </Card>;
}

export default function KeyPoints() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card2 />
      <Card1 />
      <Card3 />
    </div>
  );
}