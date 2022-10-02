import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Typography, Button, Box, Card } from '@material-ui/core';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Radar } from 'react-chartjs-2';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const useStyles = makeStyles({
  pokemon_content: {
    margin: 'auto',
    display: 'flex'
  },
})

const theme = createTheme({
  typography: {
    fontFamily: [
      "Lato"
    ].join(",")
  }
});

const Pokemon = () => {

  const { pokemonID } = useParams();
  const [pokemonData, setPokemonData] = useState({})
  const [pokemonSpecies, setPokemonSpecies] = useState({})
  const navigate = useNavigate();
  const classes = useStyles()
  const pokemonImage1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID - 1}.png`
  const pokemonImage2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(pokemonID) + 1}.png`

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
  },[pokemonData])

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`)
    .then((response) => {
      setPokemonSpecies(response.data)
    })
    .catch((error) => {
      console.log('There was an ERROR: ', error);
    })
  },[pokemonSpecies])

  const firstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1);

  if (pokemonData.sprites && pokemonSpecies.flavor_text_entries) {
    const data = {
      labels: [
        `${pokemonData.stats[0].stat.name}`,
        `${pokemonData.stats[1].stat.name}`,
        `${pokemonData.stats[2].stat.name}`,
        `${pokemonData.stats[3].stat.name}`,
        `${pokemonData.stats[4].stat.name}`,
        `${pokemonData.stats[5].stat.name}`
      ],
      datasets: [
        {
          label: 'Stats',
          data: [
            `${pokemonData.stats[0].base_stat}`,
            `${pokemonData.stats[1].base_stat}`,
            `${pokemonData.stats[2].base_stat}`,
            `${pokemonData.stats[3].base_stat}`,
            `${pokemonData.stats[4].base_stat}`,
            `${pokemonData.stats[5].base_stat}`
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={() => navigate(`/${pokemonID - 1}`)}>
        <KeyboardArrowLeft/>
      </Button>
      <img src={pokemonImage1} />
        <Typography variant="h1">
          {firstCharUppercase(pokemonData.name)} {`#${pokemonID}`}
        </Typography>
        <img src={pokemonImage2} />
        <Button onClick={() => navigate(`/${parseInt(pokemonID) + 1}`)}>
        <KeyboardArrowRight  onClick={() => navigate(`/${parseInt(pokemonID) + 1}`)}/>
      </Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img src={fullPokemonImage} />
        <div className='radar'>
          <Radar data={data}/>
        </div>
      </Box>
      <Typography align='center' >
        {`${pokemonSpecies.flavor_text_entries[8].flavor_text}`}
      </Typography>
      <Typography align='center'>
        Habitat: {firstCharUppercase(pokemonSpecies.habitat.name)}
      </Typography>
      <Typography align='center'> Height: {pokemonData.height}</Typography>
      <Typography align='center' > Weight: {pokemonData.weight}</Typography>
      <Typography variant="h6" align='center'> Types: </Typography>
        {pokemonData.types.map(typeInfo => {
          return <Typography align='center' key={typeInfo.type.name}>{firstCharUppercase(typeInfo.type.name)}</Typography>
        })}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      <Button variant="contained" onClick={() => navigate("/")}>Back to Pokedex</Button>
      </Box>
      </ThemeProvider>
    </div>
  );
  }
}

export default Pokemon;
