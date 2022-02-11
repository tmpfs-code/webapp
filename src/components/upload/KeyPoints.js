import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getGitHubLink, GIT_COMMIT_HASH } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column", 
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    "& p": {
      fontSize: "1.5em",
      [theme.breakpoints.down('md')]: {  
        fontSize: "1em",
      },
    }
  },
}));

export default function KeyPoints() {
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <div className={classes.root}>
    <CardContent>
      <Typography color="textSecondary" component="p">
        <Trans i18nKey={'end_to_end_text'} />
      </Typography>
    </CardContent>
    <CardActions className={classes.cardActionArea}>
      <Button size="small" color="primary" onClick={() => window.open(getGitHubLink(GIT_COMMIT_HASH), '_blank')}>
        {t('review_source_code')}
      </Button>
    </CardActions>
    </div>
  );
}