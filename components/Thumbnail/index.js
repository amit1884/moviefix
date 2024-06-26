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
        source={require("../../assets/thumbnail_1.png")}
        style={{ flex: 1 }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          overflow: "hidden",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>{data?.title}</Text>
        <Text style={{ color: "#fff" }}>{data?.popularity}</Text>
      </View>
    </View>
  );
};

export default React.memo(Thumbnail);
