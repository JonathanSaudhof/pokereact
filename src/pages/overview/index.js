import React, { useContext } from "react";
import PokeContext from "../../pokeContext";
import Overview from "./overview";

const OverviewContainer = ({ page }) => {
  let {
    limit,
    currentPage,
    pokeCount,
    setCurrentPage,
    prevPage,
    nextPage,
    allPokemon,
  } = useContext(PokeContext);

  function getNavigationItems() {
    const navigationItems = [];

    navigationItems.push(
      <button
        className={`navigation-item shadow next-prev`}
        onClick={() => prevPage()}
      >
        {"<"}
      </button>,
    );

    for (let i = 0; i * limit < pokeCount; i++) {
      navigationItems.push(
        <button
          key={i}
          className={`navigation-item shadow ${
            currentPage === i ? "active" : ""
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </button>,
      );
    }
    navigationItems.push(
      <button
        className={`navigation-item shadow next-prev`}
        onClick={() => nextPage()}
      >
        {">"}
      </button>,
    );
    return navigationItems;
  }

  const pokemonsOnPage = allPokemon.slice(
    page || currentPage,
    page || currentPage + limit,
  );

  return (
    <Overview
      navigationItems={getNavigationItems()}
      pokemonsOnPage={pokemonsOnPage}
    />
  );
};

export default OverviewContainer;
