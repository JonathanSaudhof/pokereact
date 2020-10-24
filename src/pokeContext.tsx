import React, { createContext } from "react";
import axios from "axios";

const PokeContext = createContext({
  isLoading: true,
  pokeCount: 0,
  limit: 50,
  allPokemon: [],
  currentPage: 0,
});

interface Props {
  value?: any;
  children: any;
}

type PokemonType = {
  id: number;
  name: string;
  baseExperience: string;
  image: string;
  weight: string;
  height: string;
};

interface State {
  isLoading: boolean;
  pokeCount: number;
  limit: number;
  allPokemon: PokemonType[];
  currentPage: number;
}

export class PokeProvider extends React.Component<Props, State> {
  state = {
    isLoading: true,
    pokeCount: 0,
    limit: 50,
    allPokemon: [],
    currentPage: 0,
    setCurrentPage: this.setPage.bind(this),
    nextPage: this.nextPage.bind(this),
    prevPage: this.prevPage.bind(this),
  };

  componentDidMount() {
    this.getPokemon();
  }

  async getPokemon() {
    let pokeCountTemp = 0;
    let pokeFetchUri = ``;
    let pokemonRawData: any[] = [];

    pokeCountTemp = await axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((doc) => {
        return doc.data.count;
      })
      .catch((err) => console.error(err));

    if (pokeCountTemp === 0) {
      return false;
    }

    this.setState({ pokeCount: pokeCountTemp });
    pokeFetchUri = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${pokeCountTemp}`;

    await axios
      .get(pokeFetchUri)
      .then(async (doc) => {
        const pokemons = doc.data.results;
        let getImagesAndPokemonData: Promise<object>[] = [];

        pokemons.forEach((pokemon: { name: string }) => {
          getImagesAndPokemonData.push(
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`),
          );
        });
        pokemonRawData = await Promise.all(getImagesAndPokemonData);
      })
      .then((doc) => doc)
      .catch((err) => {
        console.error(err);
      });

    pokemonRawData.forEach(({ data }) => {
      // console.log(data);
      const newPokemon: PokemonType = {
        id: data.id,
        name: data.name,
        baseExperience: data.base_experience,
        image: data.sprites.front_default,
        weight: data.weight,
        height: data.height,
      };

      let pokemon = this.state.allPokemon;

      this.setState({
        allPokemon: [...pokemon, newPokemon],
      });
    });

    if (this.state.allPokemon.length === 0) {
      return false;
    }
    this.finishedLoading();
  }

  nextPage(): void {
    if (this.state.currentPage < this.state.pokeCount / this.state.limit - 1) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  }

  prevPage(): void {
    if (this.state.currentPage > 0) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  }

  setPage(page: number): void {
    this.setState({ currentPage: page });
  }

  finishedLoading(): void {
    this.setState({ isLoading: false });
  }

  render(): React.ReactNode {
    return (
      <PokeContext.Provider value={this.state || {}}>
        {this.props.children}
      </PokeContext.Provider>
    );
  }
}

export default PokeContext;
