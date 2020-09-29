import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import ListPokemon from "../components/ListPokemon";

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
    &.active {
      background: ${(props) => props.theme.midColor};
      color: white;
      font-weight: 600;
    }
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

const Loader = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  font-size: 36px;
`;

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

          setPokemonsOnPage((elements) => [...elements, newPokemon]);
        });

        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const navigationItems = [];

  for (let i = 1; (i - 1) * limit < pageCount; i++) {
    navigationItems.push(
      <a
        href={"/" + i}
        key={i}
        className={`navigation-item ${page == i ? "active" : ""}`}
      >
        {i}
      </a>,
    );
  }

  return (
    <div>
      {isLoading ? (
        <Loader>
          <span>is loading</span>
        </Loader>
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
