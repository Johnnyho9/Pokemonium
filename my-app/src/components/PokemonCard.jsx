import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import shadows from '@material-ui/core/styles/shadows';

const useStyles = makeStyles({
  cardImg: {
    cursor: 'pointer',
    transform: '1.05'
  },
  cardContent: {
    textAlign: "center",
    border: 'solid black'
  },
  card: {
    padding: '10px 10px'
  },
})

const PokemonCard = ({pokemon}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.entry_number}.gif`

  const firstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1);

    // {firstCharUppercase(pokemon.pokemon_species.name)}

  return (
    <Grid item xs={4} sm={2} onClick={()=> navigate(`/${pokemon.entry_number}`)}>
      <Card className={classes.card} elevation={0}>
        {/* <CardMedia
          className={classes.cardMedia}
          image={pokemonImage}
          style={{height: '20px', width: '20px'}}/> */}
        <img src={`${pokemonImage}`} className={classes.cardImg}></img>
        {/* <CardContent className={classes.cardContent}>
          <Typography className='cardName' >{pokemon.entry_number}</Typography>
        </CardContent> */}
      </Card>
    </Grid>
  );
}

export default PokemonCard;
