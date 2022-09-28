import './App.css';
import React, { useContext } from 'react';
import PokedexList from './components/Pokedex.jsx';
import PokemonCard from './components/PokemonCard.jsx';
import {
  Routes,
  Route,
} from "react-router-dom";
// import { KantoContext } from './context/kanto-context.jsx'

function App() {
  // const { pokemonList } = useContext(KantoContext);

  return (
    <Routes>
      <Route path="/" element={<PokedexList />} />
      <Route path="/:pokemonID" element={<PokemonCard />} />
    </Routes>
  );
}

export default App;
