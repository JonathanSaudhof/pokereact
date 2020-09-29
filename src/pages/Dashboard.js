import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PokemonDetail from "./PokemonDetail";
import { Redirect } from "react-router-dom";

const PokemonOverviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PokemonPreviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 15px;
  margin: 15px;
  background: ${(props) => props.theme.lightColor};
  font-size: 14px;

  &:hover {
    background: ${(props) => props.theme.hoverColor};
    cursor: pointer;
  }
`;

const PokemonModal = styled.div`
  position: fixed;
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 101;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);

  .content-wrapper {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px;
    background: ${(props) => props.theme.lightColor};
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.5);
    img {
      padding-right: 20px;
    }
    #close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 10px;
      font-size: 24px;
      :hover {
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
`;

const Pageination = styled.ul`
  display: flex;
  justify-content: center;
  .navigation-item {
    padding: 15px;
    width: 50px;
    height: 50px;
    text-align: center;
    text-decoration: none;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    border-right: 1px solid ${(props) => props.theme.borderColor};
    background: ${(props) => props.theme.lightColor};
    color: black;

    &:first-child {
      border-radius: 10px 0 0 10px;
      border-left: 1px solid ${(props) => props.theme.borderColor};
    }
    &:last-child {
      border-radius: 0 10px 10px 0;
    }
    :hover {
      font-weight: bold;
    }
  }
`;

const PokemonPreview = (pokemon) => {
  let [showDetail, setShowDetail] = useState(false);
  return (
    <>
      <PokemonPreviewItem onClick={(event) => setShowDetail(true)}>
        <img src={pokemon.image} />
        <div>{pokemon.name}</div>
      </PokemonPreviewItem>
      <PokemonModal visible={showDetail}>
        <div className='content-wrapper'>
          <img src={pokemon.image} />
          <div>
            <p>name: {pokemon.name}</p>
            <p>weight: {pokemon.weight}</p>
            <p>height: {pokemon.height}</p>
            <p>base experience: {pokemon.baseExperience}</p>
          </div>

          <div onClick={(event) => setShowDetail(false)} id='close'>
            x
          </div>
        </div>
      </PokemonModal>
    </>
  );
};

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

const Dashboard = ({ page }) => {
  let [pokemonsOnPage, setPokemonsOnPage] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [pageCount, setPageCount] = useState(0);

  // limited 50 pokemon per page

  const limit = 50;

  // get Pokemon Details
  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/?limit=50&offset=${
          (page - 1) * limit
        }`,
      )
      .then((doc) => {
        const pokemons = doc.data.results;
        setPageCount(doc.data.count);

        let getImages = [];
        pokemons.map((pokemon) => {
          getImages.push(
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`),
          );
        });
        return Promise.all(getImages);
      })
      .then((doc) => {
        // create data for all pokemons
        doc.map(({ data }) => {
          const newPokemon = {
            id: data.id,
            name: data.name,
            baseExperience: data.base_experience,
            image: data.sprites.front_default,
            weight: data.weight,
            height: data.height,
          };

          setPokemonsOnPage((elements) => [...elements, newPokemon]);
        });

        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const navigationItems = [];

  for (let i = 1; (i - 1) * limit < pageCount; i++) {
    navigationItems.push(
      <a href={"/" + i} className='navigation-item'>
        {i}
      </a>,
    );
  }

  return (
    <div>
      {isLoading ? (
        "is loading"
      ) : (
        <>
          <Pageination>{navigationItems}</Pageination>
          <ListPokemon pokemonsOnPage={pokemonsOnPage} page pageCount />
        </>
      )}
    </div>
  );
};

export default Dashboard;
