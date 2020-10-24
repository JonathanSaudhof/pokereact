import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

// Poke Context

import { ThemeProvider } from "styled-components";
import { PokeProvider } from "./pokeContext";
import theme from "./layout/theme";
import GlobalStyle from "./layout/globalstyle";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PokeProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </PokeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
