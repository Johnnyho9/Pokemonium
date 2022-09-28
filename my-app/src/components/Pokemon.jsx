import React from 'react';
import { useParams } from "react-router-dom";

const Pokemon = () => {

  const { pokemonID } = useParams();
  const

  return (
    <div >
      Pokemon Card! {pokemonID}
    </div>
  );
}

export default Pokemon;
