import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../constants/colors";

export default LoadingBlock = ({ width }) => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="truck-loading" size={25} color={colors.white} />
      <View style={[styles.longBlock, { width: width }]} />
      <View style={styles.shortBlock} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    height: 60,
    marginVertical: 3,
    paddingHorizontal: 30,
  },
  longBlock: {
    height: 25,
    backgroundColor: colors.white,
    marginLeft: 5,
  },
  shortBlock: {
    height: 25,
    backgroundColor: colors.white,
    marginLeft: 10,
    width: 20,
  },
});
