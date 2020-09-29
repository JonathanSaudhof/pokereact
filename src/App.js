import React from "react";

import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

// pages

import Dashboard from "./pages/Dashboard";
import PokemonDetail from "./pages/PokemonDetail";

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
        <div>POKEREACT</div>
      </MyHeader>
      <Main>
        <Switch>
          <Route
            exact
            path='/:page'
            render={(props) => <Dashboard page={props.match.params.page} />}
          />
          <Route
            exact
            path='/pokemon/:pokemonId'
            render={(props) => (
              <PokemonDetail pokemonId={props.match.params.pokemonId} />
            )}
          />
          <Route exact path='/' render={(props) => <Dashboard page={1} />} />
        </Switch>
      </Main>
    </div>
  );
}

export default App;
