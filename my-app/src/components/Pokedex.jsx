import React, { useEffect, useState, useContext } from 'react';
import { AppBar, Toolbar, Grid, TextField } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import PokemonCard from './PokemonCard';
import axios from 'axios';
import { LocalStorageContext } from '../context/local-storage.context.jsx';

const useStyles = makeStyles(theme => ({
  container: {
    padding: "5% 5%"
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
  appBar_container: {
    display: 'flex'
  },
  pokemon_title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '28%'
  }
}))

const PokedexList = () => {
  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState([])
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokedex/2/")
    .then((response) => {
      setPokemonList(response.data.pokemon_entries)
    })
    .catch((error) => {
      console.log('There was an ERROR: ', error);
    })
  },[])

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  if (pokemonList.length) {
    return (
      <div className='main-container'>
        <div id='slider' className='pokedex-container'>
        <AppBar position='absolute' className={classes.appBar_container}>
          <Toolbar>
            <div className={classes.searchContainer}>
              <SearchIcon className={classes.searchIcon}/>
              <TextField
                className={classes.searchInput}
                label='Pokemon'
                variant='standard'
                onChange={handleSearchInput}/>
            </div>
            <img src={require('../images/pokemon_title.png')} className={classes.pokemon_title}></img>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} className={classes.container}>
          {pokemonList.map((pokemon, index) =>
            pokemon.pokemon_species.name.includes(searchInput) &&
            <PokemonCard pokemon={pokemon} key={index}/>
          )}
        </Grid>
        </div>
      </div>
    );
  }
}

export default PokedexList;
