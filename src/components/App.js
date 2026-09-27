
import { Web3Provider } from '@ethersproject/providers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Download from './Download';
import Upload from "./Upload";

function getLibrary(provider, connector) {
  return new Web3Provider(provider);
}

// https://material-ui.com/customization/default-theme/#default-theme
const themeOverrides = {
  typography: {
    fontSize: 16,
    fontFamily: "'Barlow', sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    button: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
  },
  shape: {
    borderRadius: 14,
  },
  customDark: {
    bgColor: "#0E0E21",
    qrCodeColor: "#0E0E21",
    bgTextColor1: "#fff",
    bgTextColor2: "#fafafa",
    bgTextColor3: "#bbbbbb",
    dark1: "#353535",
  },
  customLight: {
    bgColor: "#fbfbfe",
    qrCodeColor: "#0E0E21",
    bgTextColor1: "#000",
    bgTextColor2: "#000",
    bgTextColor3: "#666",
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
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        borderRadius: 12,
        paddingTop: "0.65em",
        paddingBottom: "0.65em",
        paddingLeft: "1.5em",
        paddingRight: "1.5em",
        boxShadow: "none",
        transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0 10px 24px -10px rgba(0,0,0,0.35)",
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      },
    },
    MuiFab: {
      root: {
        boxShadow: "0 16px 32px -12px rgba(42,231,168,0.55)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 20px 38px -10px rgba(42,231,168,0.65)",
          transform: "translateY(-2px) scale(1.03)",
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 20,
      },
      elevation3: {
        boxShadow: "0 30px 70px -30px rgba(15,15,35,0.28)",
      },
    },
    MuiDialog: {
      paper: {
        padding: "0.5em",
      },
    },
  },
};

export const ThemeContext = React.createContext()

export function App() {
  const [themeName, setThemeName] = React.useState('light');

  const toggleThemeName = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  const theme = createMuiTheme({
    ...themeOverrides,
    themeName: themeName,
    custom: (themeName === 'light') ? themeOverrides.customLight : themeOverrides.customDark,
  });

  return (
    <ThemeContext.Provider value={{themeName, toggleThemeName}}>
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <BrowserRouter>
            <Switch>
              <Route
                path="/file/:id"
                render={({ match }) => <Download id={match.params.id} encodedKey={document.location.hash ? document.location.hash.substr(1) : ''} />}
              />

              <Route>
                <Upload />
              </Route>
            </Switch>
          </BrowserRouter>
        </Web3ReactProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
