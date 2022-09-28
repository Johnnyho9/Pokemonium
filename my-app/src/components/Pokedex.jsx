import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PokemonCard from './PokemonCard';
import axios from 'axios';

const useStyles = makeStyles({
  container: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px"
  }
})

const PokedexList = () => {
  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState([])

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

  return (
    <>
      <AppBar position='relative'>
        <Toolbar/>
      </AppBar>
      <Grid container spacing={5} className={classes.container}>
        {pokemonList.map((pokemon, index) =>
          <PokemonCard pokemon={pokemon} key={index}/>
        )}
      </Grid>
    </>
  );
}

export default PokedexList;
