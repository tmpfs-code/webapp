
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT_EMAIL, getGitHubLink, GIT_COMMIT_HASH, SERVER_NAME } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.8rem",
  },
  footerItem: {
    padding: "0.6rem",
    color: theme.custom.bgTextColor3,
    cursor: "default",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    }
  },
  footerItemHighlighted: {
    color: theme.palette.secondary.light,
  },
  footerLink: {
    cursor: "pointer",
    display: "block",
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
    <DialogTitle>{t('contact_title')}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <span style={{userSelect: "none"}}>{t('contact_msg')}</span>
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

function FooterItem(props) {
  const classes = useStyles();
  const { highlight } = props;

  return <span
    onClick={props.onClick}
    className={`${classes.footerItem} ${highlight ? classes.footerItemHighlighted : ''} ${props.onClick ? classes.footerLink : ""}`}>
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
};

function Footer() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [ contactDialogOpen, setContactDialogOpen ] = React.useState(false);
  // const themeContext = React.useContext(ThemeContext);

  return <footer className={classes.root}>
    <ContactDialog
      open={contactDialogOpen}
      onClose={() => setContactDialogOpen(false)} 
    />

    <Grid container justify="center">
      <FooterItem>
        © {(new Date()).getFullYear()} {SERVER_NAME}
      </FooterItem>

      <FooterItem onClick={() => window.open(getGitHubLink(GIT_COMMIT_HASH), '_blank')} highlight>
        {prettyPrintCommitHashOrTag(GIT_COMMIT_HASH)} (GitHub)
      </FooterItem>

      <FooterItem onClick={() => setContactDialogOpen(true)}>
        {t('contact')}
      </FooterItem>

      <FooterItem onClick={() => window.open(getGitHubLink(GIT_COMMIT_HASH, '/legal/privacy.md'), '_blank')}>
        {t('privacy_policy')}
      </FooterItem>

      <FooterItem onClick={() => window.open(getGitHubLink(GIT_COMMIT_HASH, '/legal/terms.md'), '_blank')}>
        {t('terms')}
      </FooterItem>

      {/* <FooterItem onClick={() => window.open('https://www.flaticon.com/', '_blank', "noreferrer")}>
        <span title="Icons made by flaticon.com">Icons</span>
      </FooterItem> */}

      <FooterItem onClick={() => window.open('/checksums.txt', '_blank')}>
        checksums.txt
      </FooterItem>
      
      {/* <FooterItem onClick={() => themeContext.toggleThemeName()}>
        {themeContext.themeName === 'light' ? 'Dark' : 'Light'}
      </FooterItem> */}
    </Grid>
  </footer>;
}

export default Footer;
