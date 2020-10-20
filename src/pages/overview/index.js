import React, { useContext } from "react";
import PokeContext from "../../pokeContext";
import Overview from "./overview";

const OverviewContainer = () => {
  let context = useContext(PokeContext);
  const {
    allPokemon,
    pokeCount,
    currentPage,
    setCurrentPage,
    nextPage,
    prevPage,
    showLimit,
  } = context;

  const navigationItems = [];

  for (let i = 0; i * showLimit < pokeCount; i++) {
    navigationItems.push(
      <button
        key={i}
        className={`navigation-item ${currentPage == i ? "active" : ""}`}
        onClick={() => setCurrentPage(i)}
      >
        {i + 1}
      </button>,
    );
  }

  const pokemonsOnPage = allPokemon.slice(currentPage, currentPage + showLimit);

  // const NextButton = () => {
  //   return <button onClick={() => nextPage()}>Next</button>;
  // };

  // const PrevButton = () => {
  //   return <button onClick={() => prevPage()}>Prev</button>;
  // };

  return (
    <Overview
      navigationItems={navigationItems}
      pokemonsOnPage={pokemonsOnPage}
    />
  );
};

export default OverviewContainer;
