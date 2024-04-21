import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Thumbnail from "../Thumbnail";
const col = 2;
function MovieList({ movieList, loading, fetchMovieList }) {
  return (
    <View
      style={{
        backgroundColor: "#121212",
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
      }}
    >
      {movieList?.length > 0 ? (
        <FlatList
          data={movieList}
          renderItem={({ item }) => (
            <Thumbnail
              imgUrl={item?.backdrop_path}
              title={item?.title}
              rating={item?.popularity}
            />
          )}
          keyExtractor={(item) => item?.id}
          numColumns={col}
          onEndReached={fetchMovieList}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" /> : null
          }
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20, color: "#fff" }}>No Result Found</Text>
        </View>
      )}
    </View>
  );
}

export default MovieList;
