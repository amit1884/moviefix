import React, { useCallback, useEffect, useState } from "react";
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
    return <Thumbnail data={item} />;
  }, []);
  const renderFlatList = useCallback(({ item }) => {
    return (
      <>
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              marginVertical: 5,
              marginHorizontal: 10,
            }}
          >
            {item.year}
          </Text>
          <FlatList
            data={item.data}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderFlatListItem}
          />
        </View>
      </>
    );
  }, []);
  const formatData = useCallback(() => {
    return Object.keys(uniqueobj).map((year) => ({
      year: parseInt(year),
      data: moviesByYear[year],
    }));
  }, [uniqueobj]);
  return (
    <View
      style={{
        backgroundColor: "#121212",
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
      }}
    >
      <FlatList
        data={formatData()}
        renderItem={renderFlatList}
        onEndReached={() => fetchMovieList(true)}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        ListEmptyComponent={() => (
          <Text style={{ color: "#fff" }}>No Results Found</Text>
        )}
      />
    </View>
  );
}

export default React.memo(MovieList);
