import React, { useState } from "react";
import { TextInput, View } from "react-native";
import GenreList from "./GenreList";

function Filters({
  fetchMovies,
  query,
  setQuery,
  selectedGeneres,
  setSelectedGenres,
}) {
  const handleChange = (text) => {
    setQuery(text);
  };
  return (
    <View>
      <TextInput
        placeholder="Search movie"
        style={{
          marginVertical: 15,
          backgroundColor: "#fff",
          padding: 5,
          marginHorizontal: 3,
          borderRadius: 5,
        }}
        value={query}
        onChangeText={(text) => handleChange(text)}
      />
      <GenreList
        fetchMovies={fetchMovies}
        selectedGeneres={selectedGeneres}
        setSelectedGenres={setSelectedGenres}
      />
    </View>
  );
}

export default Filters;
