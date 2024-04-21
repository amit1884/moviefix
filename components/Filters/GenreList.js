import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import CustomCheckBox from "./CustomCheckBox";
import { API_TOKEN, BASE_URL } from "../../constants";

function GenreList({ fetchMovies,selectedGeneres,setSelectedGenres }) {
  const [genres, setGenres] = useState([{ id: 0, name: "All" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getGenres();
  }, []);
  const getGenres = () => {
    setLoading(true);
    try {
      fetch(`${BASE_URL}/3/genre/movie/list?language=en&api_key=${API_TOKEN}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            setError("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setGenres(data?.genres);
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
  const onGenreSelect = (value) => {
    if (selectedGeneres.includes(value)) {
      setSelectedGenres((prevGenres) =>
        prevGenres.filter((genre) => genre !== value)
      );
    } else {
      setSelectedGenres([...selectedGeneres, value]);
    }
  };
  return (
    <View>
      <FlatList
        data={genres}
        renderItem={({ item }) => (
          <CustomCheckBox
            label={item?.name}
            value={item?.id}
            active={false}
            selectedGeneres={selectedGeneres}
            setSelectedGenres={setSelectedGenres}
            onSelect={onGenreSelect}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
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
  );
}

export default GenreList;

const styles = StyleSheet.create({});
