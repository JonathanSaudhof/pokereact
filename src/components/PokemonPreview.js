import React, { useState } from "react";
import styled from "styled-components";

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
      width: 200px;
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
  width: 180px;
  img {
    max-width: 100%;
  }
  &:hover {
    background: ${(props) => props.theme.hoverColor};
    cursor: pointer;
  }
`;

const PokemonPreview = (pokemon) => {
  let [showDetail, setShowDetail] = useState(false);
  return (
    <>
      <PokemonPreviewItem onClick={(event) => setShowDetail(true)}>
        <img
          src={pokemon.image || "/no-image.png"}
          alt={"pokemon-image-of-" + pokemon.name}
        />
        <div>{pokemon.name}</div>
      </PokemonPreviewItem>
      <PokemonModal visible={showDetail}>
        <div className='content-wrapper'>
          <img
            src={pokemon.image || "/no-image.png"}
            alt={"pokemon-image-of-" + pokemon.name}
          />
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

export default PokemonPreview;
