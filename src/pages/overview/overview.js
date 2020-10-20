import React from "react";

import ListPokemon from "../../components/ListPokemon";
import Pageination from "../../components/Pageination";

const Overview = ({
  navigationItems,
  pokemonsOnPage,
  // NextButton,
  // PrevButton,
}) => {
  return (
    <div>
      {/* TODO: <PrevButton /> */}
      <Pageination>{navigationItems}</Pageination>
      <ListPokemon pokemonsOnPage={pokemonsOnPage} page pageCount />
      {/* TODO:  <NextButton /> */}
    </div>
  );
};

export default Overview;
