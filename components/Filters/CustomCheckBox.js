import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function CustomCheckBox({
  label,
  value,
  onSelect,
  active,
  selectedGeneres,
  setSelectedGenres,
}) {
  const handleOnPress =async (value) => {
  
    onSelect && onSelect(value);
  };
  return (
    <Pressable
      onPress={() => handleOnPress(value)}
      style={[
        styles.default,
        selectedGeneres.includes(value)
          ? styles.activeContainer
          : styles.inActiveContainer,
      ]}
    >
      <Text style={styles.defaultText}>{label}</Text>
    </Pressable>
  );
}

export default CustomCheckBox;

const styles = StyleSheet.create({
  default: {
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 2,
  },
  activeContainer: {
    backgroundColor: "#F0283C",
  },
  inActiveContainer: {
    backgroundColor: "#484848",
  },
  defaultText: {
    fontSize: 15,
    textAlign: "center",
    color: "#fff",
  },
});
