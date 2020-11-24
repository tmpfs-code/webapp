
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { CONTACT_EMAIL, getGitHubLink, SERVER_NAME, GIT_COMMIT_HASH } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1em",
    marginTop: "2em",
    [theme.breakpoints.down('xs')]: {
      borderTop: `1px solid ${theme.custom.dark1}`,
      paddingTop: "1em",
    }
  },
  footerItem: {
    color: theme.custom.bgTextColor3,
    padding: "0 0.8em",
    cursor: "default",
    [theme.breakpoints.down('xs')]: {  
      width: "100%",
      display: "block",
      padding: "0.3em 0",
    },
  },
  footerItemHighlighted: {
    color: theme.palette.secondary.light,
  },
  footerLink: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
    "&:active": {
      color: theme.palette.primary.main,
    }
  },
}));

function ContactDialog(props) {
  const { t } = useTranslation();
  const { open, onClose } = props;

  return <Dialog
    transitionDuration={0}
    open={!!open}
    onClose={onClose}
  >
    <DialogTitle>{t('contactTitle')}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <span style={{userSelect: "none"}}>{t('contactMsg')}</span>
        <b>{CONTACT_EMAIL}</b>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        {t('close')}
      </Button>
    </DialogActions>
  </Dialog>
}

function FooterLink(props) {
  const classes = useStyles();
  const { highlight } = props;

  return <span
    onClick={props.onClick}
    className={`${classes.footerItem} ${highlight ? classes.footerItemHighlighted : ''} ${props.onClick ? classes.footerLink : ""}`}
  >
    {props.children}
  </span>
}

function prettyPrintCommitHashOrTag(str) {
  if (!str) {
    return "?";
  }
  if (str.length >= 40) {
    return str.substr(0, 7);
  }
  return str;
}

function Footer() {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [ contactDialogOpen, setContactDialogOpen ] = React.useState(false);

  return <footer className={classes.root}>
    <ContactDialog
      open={contactDialogOpen}
      onClose={() => setContactDialogOpen(false)} 
    />

    <FooterLink onClick={() => window.open(getGitHubLink(GIT_COMMIT_HASH), '_blank')} highlight>
      {prettyPrintCommitHashOrTag(GIT_COMMIT_HASH)} (GitHub)
    </FooterLink>

    <FooterLink onClick={() => history.push("/pages/privacy")}>
      {t('privacy_policy')}
    </FooterLink>

    <FooterLink onClick={() => history.push("/pages/terms")}>
      {t('terms')}
    </FooterLink>

    <FooterLink onClick={() => setContactDialogOpen(true)}>
      {t('contact')}
    </FooterLink>

    <FooterLink>
      Copyright © {(new Date()).getFullYear()} {SERVER_NAME}
    </FooterLink>
  </footer>
}

export default Footer;
