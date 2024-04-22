import React, { useState } from "react";
import { TextInput, View } from "react-native";
import GenreList from "./GenreList";

function Filters({
  fetchMovies,
  selectedGeneres,
  setSelectedGenres,
}) {
  return (
    <View>
     
      <GenreList
        fetchMovies={fetchMovies}
        selectedGeneres={selectedGeneres}
        setSelectedGenres={setSelectedGenres}
      />
    </View>
  );
}

export default Filters;
