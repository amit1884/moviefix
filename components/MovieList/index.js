import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SectionList,
  Text,
  View,
} from "react-native";
import Thumbnail from "../Thumbnail";
function MovieList({ loading, fetchMovieList, moviesByYear,handleRefresh,refreshing }) {
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
    return Object.keys(moviesByYear).map((year) => ({
      year: parseInt(year),
      data: moviesByYear[year],
    }));
  }, [moviesByYear]);
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
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </View>
  );
}

export default React.memo(MovieList);
