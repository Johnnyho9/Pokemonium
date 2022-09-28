import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const KantoContext = createContext({
  pokemonList: {}
});

export const KantoProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState({});

  const options = {
    protocol: 'https',
    hostName: 'localhost:443',
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
  }

  const P = new Pokedex();

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokedex/2/")
    .then((response) => {
      console.log(response.data.pokemon_entries);
      setPokemonList(response.data.pokemon_entries)
    })
    .catch((error) => {
      console.log('There was an ERROR: ', error);
    })
  },[])

  const value = { pokemonList, setPokemonList };

  return (<KantoContext.Provider value={value}>{children}</KantoContext.Provider>)
}