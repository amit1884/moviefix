import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { useCallback, useEffect, useState } from "react";
import { API_TOKEN, BASE_URL } from "./constants";

function App() {
  const [moviesByYear, setMoviesByYear] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [releaseYear, setReleaseYear] = useState(2012);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedGeneres, setSelectedGenres] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setReleaseYear(2012);
    setMoviesByYear({});
    setPage(1);
    fetchMovieList();
  }, [selectedGeneres]);

  const fetchMovieList = (isScrollFetch) => {
    setLoading(true);
    let url = `${BASE_URL}/3/discover/movie?api_key=${API_TOKEN}&sort_by=popularity.desc&primary_release_year=${releaseYear}&page=${page}&vote_count.gte=100`;
    if (selectedGeneres?.length > 0) {
      let genreList = selectedGeneres?.join(",");
      url = url + `&with_genres=${genreList}`;
    }
    try {
      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            setError("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const moviesGroupedByYear = groupMoviesByYear(data?.results);
          setMoviesByYear({ ...moviesByYear, ...moviesGroupedByYear });
          setError("");
          setLoading(false);
          setTotalPages(data?.total_pages);
          if (isScrollFetch && page >= totalPages) {
            setReleaseYear((prevYear) => prevYear + 1);
            setPage(1);
          } else if (isScrollFetch) {
            setPage((prevPage) => prevPage + 1);
          }
        })
        .catch((error) => {
          setError("There was a problem with your fetch operation:");
          setLoading(false);
        });
    } catch (error) {
      console.error("There was a problem with the try block:", error);
      setLoading(false);
    }
  };

  const groupMoviesByYear = (movies) => {
    const moviesGroupedByYear = {};
    movies.forEach((movie) => {
      const year = new Date(movie.release_date).getFullYear();
      if (!moviesGroupedByYear[year]) {
        moviesGroupedByYear[year] = [];
      }
      const existingIndex = moviesGroupedByYear[year].findIndex(
        (m) => m.id === movie.id
      );
      if (existingIndex === -1) {
        moviesGroupedByYear[year].push(movie);
      }
    });
    return moviesGroupedByYear;
  };
  const formatData = useCallback(() => {
    return Object.keys(moviesByYear).map((year) => ({
      year: parseInt(year),
      data: moviesByYear[year],
    }));
  }, [moviesByYear]);
  const handleRefresh = async () => {
    let data=formatData()
    setPage(1);
    setReleaseYear(data[0]?.year - 1);
    setMoviesByYear({});
    setTotalPages(0);
    setRefreshing(true);
    fetchMovieList();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <Header
          fetchMovies={fetchMovieList}
          selectedGeneres={selectedGeneres}
          setSelectedGenres={setSelectedGenres}
        />
        <MovieList
          loading={loading}
          fetchMovieList={fetchMovieList}
          moviesByYear={moviesByYear}
          handleRefresh={handleRefresh}
          refreshing={refreshing}
        />
        {error
          ? Alert.alert(
              "Error",
              error,
              [
                {
                  text: "OK",
                  onPress: () => setError(""),
                },
              ],
              { cancelable: false }
            )
          : null}
      </View>
    </SafeAreaView>
  );
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
