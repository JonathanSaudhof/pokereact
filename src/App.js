import React from "react";

import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

// pages

import Overview from "./pages/Overview";

const MyHeader = styled.header`
  positin: fixed;
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 20px;
  z-index: 100;
  font-size: 24px;
  font-weight: 600;
  box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.2);
  background: ${(props) => props.theme.midColor};
  a {
    text-decoration: none;
    color: black;
  }
`;

const Main = styled.main`
  min-height: calc(100vh - 80px);
  padding: 20px;
  width: 100%;
`;

function App() {
  return (
    <div className='App'>
      <MyHeader>
        <a href='/'>POKEREACT</a>
      </MyHeader>
      <Main>
        <Switch>
          <Route
            exact
            path='/:page'
            render={(props) => <Overview page={props.match.params.page} />}
          />
          <Route exact path='/' render={(props) => <Overview page={1} />} />
        </Switch>
      </Main>
    </div>
  );
}

export default App;
