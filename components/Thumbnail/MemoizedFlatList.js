import { FlatList, View } from "react-native";
import Thumbnail from ".";
import React from "react";

const MemoizedFlatList = function MemoizedFlatList({
  section,
  renderFlatListItem,
}) {
  return (
    <FlatList
      data={section.data}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderFlatListItem}
    />
  );
};
// Custom comparison function to prevent re-rendering unless section or renderFlatListItem changes

export default React.memo(MemoizedFlatList, (prevProps, nextProps) => {
  return (
    prevProps.section === nextProps.section &&
    prevProps.renderFlatListItem === nextProps.renderFlatListItem
  );
});
