import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  SectionList,
  Text,
  View,
} from "react-native";
import Thumbnail from "../Thumbnail";
import { makeArraysUnique } from "../../utility";
function MovieList({ loading, fetchMovieList, moviesByYear }) {
  const uniqueobj = makeArraysUnique(moviesByYear);
  const renderFlatListItem = useCallback(({ item }) => {
    return (
      <Thumbnail
        imgUrl={item?.backdrop_path}
        title={item?.title}
        rating={item?.popularity}
        releaseYear={item?.release_date}
        id={item?.id}
      />
    );
  }, []);
  const renderFlatList = useCallback(({ section }) => {
    return (
      <FlatList
        data={section.data}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFlatListItem}
      />
    );
  }, [uniqueobj,renderFlatListItem]);
  return (
    <View
      style={{
        backgroundColor: "#121212",
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
      }}
    >
      <SectionList
        sections={Object.keys(uniqueobj).map((year) => ({
          year: parseInt(year),
          data: moviesByYear[year],
        }))}
        renderSectionHeader={({ section: { year } }) => (
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              marginVertical: 5,
              marginHorizontal: 10,
            }}
          >
            {year}
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => fetchMovieList(true)}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        ListEmptyComponent={() => (
          <Text style={{ color: "#fff" }}>No Results Found</Text>
        )}
        renderItem={renderFlatList}
      />
    </View>
  );
}

export default React.memo(MovieList);
