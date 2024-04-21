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
import { useEffect, useState } from "react";
import { API_TOKEN, BASE_URL } from "./constants";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [releaseYear, setReleaseYear] = useState(2012);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedGeneres, setSelectedGenres] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [moviesByYear, setMoviesByYear] = useState([]);
  useEffect(() => {
    fetchMovieList();
  }, [query, selectedGeneres]);

  const fetchMovieListOnScroll = () => {
    setLoading(true);
    let url = `${BASE_URL}/3/discover/movie?api_key=${API_TOKEN}&sort_by=popularity.desc&primary_release_year=${releaseYear}&page=${page}&vote_count.gte=100`;
    if (selectedGeneres?.length > 0) {
      let genreList = selectedGeneres?.join(",");
      url = url + `&with_genres=${genreList}`;
    }
    if (query) {
      url = url + `&with_keywords=${query}`;
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
          console.log(data?.results);
          setMovieList((prevMovies) => [...prevMovies, ...data?.results]);
          setTotalPages(data?.total_pages);
          setError("");
          setLoading(false);
          if (page >= totalPages) {
            setReleaseYear(prevYear => prevYear + 1);
            setPage(1);
          } else {
            setPage(prevPage => prevPage + 1);
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
  const fetchMovieList = () => {
    setLoading(true);
    let url = `${BASE_URL}/3/discover/movie?api_key=${API_TOKEN}&sort_by=popularity.desc&primary_release_year=${releaseYear}&page=${1}&vote_count.gte=100`;
    if (selectedGeneres?.length > 0) {
      let genreList = selectedGeneres?.join(",");
      url = url + `&with_genres=${genreList}`;
    }
    if (query) {
      url = url + `&with_keywords=${query}`;
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
          console.log(data?.results);
          setMovieList(data?.results);
          setTotalPages(data?.total_pages);
          setError("");
          setLoading(false);
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
    // Group movies by release year
    const moviesGroupedByYear = {};
    movies.forEach(movie => {
      const year = new Date(movie.release_date).getFullYear();
      if (!moviesGroupedByYear[year]) {
        moviesGroupedByYear[year] = [];
      }
      moviesGroupedByYear[year].push(movie);
    });
    return moviesGroupedByYear;
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <Header
          fetchMovies={fetchMovieList}
          query={query}
          setQuery={setQuery}
          selectedGeneres={selectedGeneres}
          setSelectedGenres={setSelectedGenres}
        />
        <MovieList
          movieList={movieList}
          loading={loading}
          fetchMovieList={fetchMovieListOnScroll}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
