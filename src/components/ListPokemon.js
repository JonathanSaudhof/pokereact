import React from "react";
import styled from "styled-components";

import PokemonPreview from "./PokemonPreview";

const PokemonOverviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ListPokemon = ({ pokemonsOnPage = [], page }) => {
  return (
    <>
      <PokemonOverviewContainer>
        {pokemonsOnPage?.map((pokemon, index) => (
          <PokemonPreview key={pokemon.id} {...pokemon} />
        ))}
      </PokemonOverviewContainer>
    </>
  );
};

export default ListPokemon;
