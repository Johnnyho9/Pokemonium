import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Typography, Button } from '@material-ui/core';

const Pokemon = () => {

  const { pokemonID } = useParams();
  const [pokemonData, setPokemonData] = useState({})
  const navigate = useNavigate();
  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonID}.gif`

  const editPokemonID = (ID) => {
    if (pokemonID.length === 1) {
      var ID = '00' + ID
    }
    if (pokemonID.length === 2) {
      var ID = '0' + ID
    }
    return ID
  }

  const fullPokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${editPokemonID(pokemonID)}.png`

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then((response) => {
      setPokemonData(response.data)
    })
    .catch((error) => {
      console.log('There was an ERROR: ', error);
    })
  },[])

  const firstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1);

  if (pokemonData.sprites) {
  return (
    <>
      <Typography variant="h1">
        {`${pokemonID}.`} {firstCharUppercase(pokemonData.name)}
          <img src={`${pokemonData.sprites.front_default}`}></img>
      </Typography>
      <img src={fullPokemonImage} />
      <Typography variant='h3'> Pokemon Info</Typography>
      <Typography> Species: </Typography>
      <Typography> Height: {pokemonData.height}</Typography>
      <Typography> Weight: {pokemonData.weight}</Typography>
      <Typography variant="h6"> Types: </Typography>
      {pokemonData.types.map(typeInfo => {
        return <Typography key={typeInfo.type.name}>{typeInfo.type.name}</Typography>
      })}
      <Button variant="contained" onClick={() => navigate("/")}>Back to Pokedex</Button>
        </>
  );
  }
}

export default Pokemon;
