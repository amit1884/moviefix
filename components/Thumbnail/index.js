import React from "react";
import { View, Text, Image } from "react-native";

const Thumbnail = ({ id, imgUrl, title, rating, releaseYear }) => {
  return (
    <View
      style={{
        position: "relative",
        margin: 5,
        overflow: "hidden",
        borderRadius: 10,
      }}
    >
      <Image
        source={require("../../assets/thumbnail.png")}
        style={{ flex: 1 }}
      />
      <View
        style={{ position: "absolute", top: 0, left: 10, overflow: "hidden" }}
      >
        <Text style={{ color: "#fff" }}>{id}</Text>
        <Text style={{ color: "#fff" }}>{title}</Text>
        <Text style={{ color: "#fff" }}>{rating}</Text>
        <Text style={{ color: "#fff" }}>{releaseYear}</Text>
      </View>
    </View>
  );
};

export default React.memo(Thumbnail);
