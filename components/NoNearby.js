import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../constants/colors";

export default NoNearby = () => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="sad-tear" size={70} color={colors.red} />
      <Text style={styles.text}>Brak w pobliżu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat_700Bold",
    textTransform: "uppercase",
    color: colors.red,
    fontSize: 27,
    marginTop: 20,
  },
});
