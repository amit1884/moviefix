import React from "react";
import { View, Text, Image } from "react-native";

const Thumbnail = ({ data }) => {
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
        <Text style={{ color: "#fff" }}>{data?.id}</Text>
        <Text style={{ color: "#fff" }}>{data?.title}</Text>
        <Text style={{ color: "#fff" }}>{data?.popularity}</Text>
        <Text style={{ color: "#fff" }}>{data?.release_date}</Text>
      </View>
    </View>
  );
};

export default React.memo(Thumbnail);
