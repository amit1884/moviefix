import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Filters from "../Filters";

function Header({
  fetchMovies,
  query,
  setQuery,
  selectedGeneres,
  setSelectedGenres,
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.bannerContainer}>
        <Image source={require("../../assets/logo.png")} />
      </View>
      <View style={styles.filterContainer}>
        <Filters
          fetchMovies={fetchMovies}
          query={query}
          setQuery={setQuery}
          selectedGeneres={selectedGeneres}
          setSelectedGenres={setSelectedGenres}
        />
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#242424",
    padding: 10,
  },
  bannerContainer: {
    paddingTop: 10,
    marginBottom: 10,
  },
  filterContainer: {
    marginVertical: 10,
  },
});
