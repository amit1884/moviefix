import React from "react";
import { Image, Text, View } from "react-native";

function Thumbnail({ imgUrl, title, rating }) {
  return (
    <View style={{ position: "relative", margin: 5, overflow: "hidden" }}>
      <Image
        source={require("../../assets/thumbnail.png")}
        style={{ flex: 1 }}
      />
      <View style={{ position: "absolute", bottom: 10, left: 10 }}>
        <Text style={{ color: "#fff" }}>{title}</Text>
        <Text style={{ color: "#fff" }}>{rating}</Text>
      </View>
    </View>
  );
}

export default Thumbnail;
