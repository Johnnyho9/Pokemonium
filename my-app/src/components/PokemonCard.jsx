import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center"
  }
})

const PokemonCard = ({pokemon}) => {
  const classes = useStyles();
  const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.entry_number}.gif`

  return (
    <Grid item xs={4} sm={2}>
      <Card style={{ width: "100px", height: "100px"}}>
        <CardContent>
          <CardMedia
            className={classes.cardMedia}
            image={pokemonImage}
            style={{ width: "50px", height: "50px"}}/>
          <CardContent className={classes.cardContent}>
            00{pokemon.entry_number}
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PokemonCard;
