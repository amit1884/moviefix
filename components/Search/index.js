import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  View,
} from "react-native";
import { API_TOKEN, BASE_URL } from "../../constants";
import Thumbnail from "../Thumbnail";

function Search({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (text) => {
    setPage(1);
    setQuery(text);
  };
  useEffect(() => {
    fetchMovies();
  }, [query]);
  useEffect(() => {
    setQuery("");
    setError("");
    setLoading(false);
    setMovies([]);
  }, []);
  const fetchMovies = useCallback(() => {
    try {
      setLoading(true);

      fetch(
        `${BASE_URL}/3/search/movie?query=${query}&page=${page}&api_key=${API_TOKEN}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (!response.ok) {
            setError("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setError("");
          setMovies(data?.results);
          setPage((prevPage) => prevPage + 1);
        })
        .catch((error) => {
          setError("There was a problem with your fetch operation:");
          setLoading(false);
        });
    } catch (error) {
      console.error("There was a problem with the try block:", error);
      setLoading(false);
    }
  }, [query, page, movies]);
  const renderFlatListItem = useCallback(({ item }) => {
    return <Thumbnail data={item} />;
  }, []);
  return (
    <Modal
      visible={open}
      onRequestClose={() => setOpen(false)}
      presentationStyle="bottomsheet"
      animationType="slide"
    >
      <View style={{ backgroundColor: "#121212", flex: 1 }}>
        <TextInput
          placeholder="Search movie"
          style={{
            marginVertical: 15,
            backgroundColor: "#fff",
            padding: 5,
            marginHorizontal: 10,
            borderRadius: 5,
          }}
          value={query}
          onChangeText={(text) => handleChange(text)}
        />
        <View style={{ alignItems: "center", flex: 1 }}>
          <FlatList
            data={movies}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderFlatListItem}
            onEndReached={fetchMovies}
            ListFooterComponent={
              loading ? <ActivityIndicator size="large" /> : null
            }
            ListEmptyComponent={() => (
              <Text
                style={{ color: "#fff", textAlign: "center", fontSize: 17 }}
              >
                No Results Found
              </Text>
            )}
          />
        </View>
      </View>
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
    </Modal>
  );
}

export default Search;
