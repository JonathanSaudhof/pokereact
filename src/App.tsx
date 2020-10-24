import React, { useContext } from "react";
import Loader from "./components/Loader";
import PokeContext from "./pokeContext";
import { Route, Switch } from "react-router-dom";

import Overview from "./pages/overview";

import MyHeader from "./components/MyHeader";
import Main from "./components/Main";

function App() {
  const { isLoading } = useContext(PokeContext);

  return (
    <>
      {isLoading ? (
        <Loader>
          <span>is loading</span>
        </Loader>
      ) : (
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
              <Route exact path='/' render={(props) => <Overview page={0} />} />
            </Switch>
          </Main>
        </div>
      )}
    </>
  );
}

export default App;
