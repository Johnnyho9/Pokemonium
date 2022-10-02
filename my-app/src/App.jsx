import './App.css';
import React, { useContext } from 'react';
import PokedexList from './components/Pokedex.jsx';
import Pokemon from './components/Pokemon.jsx';
import {
  Routes,
  Route,
} from "react-router-dom";
// import { KantoContext } from './context/kanto-context.jsx'
import { LocalStorageContext } from './context/local-storage.context';

function App() {
  // const { pokemonList } = useContext(KantoContext);

  return (
    <Routes>
      <Route path="/" element={<PokedexList />} />
      <Route path="/:pokemonID" element={<Pokemon />} />
    </Routes>
  );
}

export default App;
