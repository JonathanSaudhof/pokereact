import React from "react";

import ListPokemon from "../../components/ListPokemon";
import Pageination from "../../components/Pageination";

const Overview = ({ navigationItems, pokemonsOnPage }) => {
  return (
    <div>
      <Pageination>{navigationItems}</Pageination>
      <ListPokemon pokemonsOnPage={pokemonsOnPage} page pageCount />
    </div>
  );
};

export default Overview;
