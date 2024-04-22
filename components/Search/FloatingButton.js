import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function FloatingButton({ openSearch }) {
  return (
    <Pressable
      style={{
        backgroundColor: "red",
        padding: 10,
        borderRadius: 60,
        margin: 10,
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
      onPress={() => openSearch(true)}
    >
      <Ionicons name="search-outline" size={24} color={"#fff"} />
    </Pressable>
  );
}

export default FloatingButton;
