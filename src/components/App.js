
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
    bgColor: "#fff",
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
  }
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
