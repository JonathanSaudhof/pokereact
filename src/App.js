import React, { useLayoutEffect, useState } from "react";

import { PokeProvider } from "./pokeContext";

import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Overview from "./pages/overview";

import MyHeader from "./components/MyHeader";
import Main from "./components/Main";
import Loader from "./components/Loader";

function App() {
  let [isLoading, setIsLoading] = useState(true);
  let [pokeCount, setPokeCount] = useState(0);
  let [showLimit, setShowLimit] = useState(50);
  let [allPokemon, setAllPokemon] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);

  // 1050 pokemon / 20 per Page =
  function nextPage() {
    if (currentPage + 1 < pokeCount % showLimit) setCurrentPage(currentPage++);
  }

  function prevPage() {
    if (currentPage > 0) setCurrentPage(currentPage--);
  }

  const PokeContext = {
    pokeCount,
    showLimit,
    setShowLimit,
    allPokemon,
    currentPage,
    setCurrentPage,
    nextPage,
    prevPage,
  };

  useLayoutEffect(() => {
    //
    const localPocemonList = localStorage.getItem("allPokemon") || null;
    const localPocemonCount = localStorage.getItem("pokeCount") || 0;

    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((doc) => {
        // just to get the total number of pokemons
        const pokeCountCache = doc.data.count;

        if (localPocemonList || localPocemonCount !== pokeCountCache) {
          setPokeCount(pokeCountCache);
          localStorage.setItem("pokeCount", pokeCountCache);

          return axios.get(
            "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=" +
              pokeCountCache,
          );
        } else {
          setPokeCount(localStorage.getItem("pokeCount"));
          setAllPokemon(localPocemonList);
        }
      })
      .then((doc) => {
        const pokemons = doc.data.results;

        let getImages = [];

        pokemons.forEach((pokemon) => {
          getImages.push(
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`),
          );
        });
        return Promise.all(getImages);
      })
      .then((doc) => {
        // create data for all pokemons
        doc.forEach(({ data }) => {
          const newPokemon = {
            id: data.id,
            name: data.name,
            baseExperience: data.base_experience,
            image: data.sprites.front_default,
            weight: data.weight,
            height: data.height,
          };
          setAllPokemon((elements) => [...elements, newPokemon]);
        });
        // TODO: store all fetched Pokemon on the Client
        // localStorage.setItem("allPokemon", JSON.stringify(allPokemon));
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <PokeProvider value={PokeContext}>
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
              <Route exact path='/' render={(props) => <Overview page={1} />} />
            </Switch>
          </Main>
        </div>
      )}
    </PokeProvider>
  );
}

export default App;
