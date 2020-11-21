
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Trans } from 'react-i18next';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Download from './Download';
import Footer from './Footer';
import PrivacyPolicy from "./PrivacyPolicy";
import StaticPage from './StaticPage';
import Terms from './Terms';
import TopBar from './TopBar';
import Upload from "./Upload";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    cursor: "default",
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.custom.bgColor,
  },

  containerMainDesc: {
    textAlign: "center",
    margin: "4em 0",
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {  
      margin: "2em 0",
    },
  },
  
  paperUploadDownload: {
    padding: "3em",
    [theme.breakpoints.down('sm')]: {  
      padding: "1.5em",
    },
  },

  desc1: {
    fontWeight: 200,
    color: theme.custom.bgTextColor2,
    "& i": {
      backgroundColor: theme.palette.primary.main,
      color: theme.custom.bgColor,
      fontWeight: 400,
      paddingRight: "1px",
      paddingLeft: "1px",
      borderRadius: "0.1em",
      fontStyle: "normal !important",
    },
  },
}));

function AppWrapper() {
  // https://material-ui.com/customization/default-theme/#default-theme
  const themeOverrides = {
    typography: {
      fontSize: 16,
      fontFamily: "'Barlow', sans-serif",
    },
    custom: {
      bgColor: "#0E0E21",
      qrCodeColor: "#0E0E21",
      bgTextColor1: "#fff",
      bgTextColor2: "#fafafa",
      bgTextColor3: "#bbbbbb",
      dark1: "#353535",
    },
    palette: {
      type: "light",
      primary: {
        main: "#2ae7a8",
        light: "#72ffda",
        dark: "#00b479",
      },
      secondary: {
        main: "#650ff2",
        light: "#a04cff",
        dark: "#0f00be",
      },
    }
  };

  let theme = createMuiTheme(themeOverrides);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function PaperLayout(props) {
  const classes = useStyles();

  const { paperContent, showDescription } = props;

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item md={7} sm={10} xs={11}>
          <Paper className={classes.paperUploadDownload} square={false} elevation={10}>
            {paperContent}
          </Paper>
        </Grid>
      </Grid>

      <Grid container justify="center" className={classes.containerMainDesc}>
        <Grid item md={7} sm={10} xs={11}>
          {showDescription && <Typography variant="h6" className={classes.desc1}>
            <Trans i18nKey="home.text1"/>
          </Typography>}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}


function App() {
  const classes = useStyles();

  return (
    <Box className={classes.container}> 
      <TopBar />
    
      <Switch>
        <Route path="/pages/privacy">
          <StaticPage>
            <PrivacyPolicy />
          </StaticPage>
        </Route>
        
        <Route path="/pages/terms">
          <StaticPage>
            <Terms />
          </StaticPage>
        </Route>

        <Route
          path="/file/:id"
          render={({ match }) => <PaperLayout 
            paperContent={<Download id={match.params.id} encodedKey={document.location.hash ? document.location.hash.substr(1) : ''} />}
            showDescription={false}
          />}
        />

        <Route
          render={({ match }) => <PaperLayout 
            paperContent={<Upload />}
            showDescription={true}
          />}
        />
      </Switch>

      <Grid container justify="center">
        <Grid item xs={11}>
          <Box align="center">
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AppWrapper;
