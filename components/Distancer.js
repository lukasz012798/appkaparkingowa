import React from "react";
import { StyleSheet, Text } from "react-native";

export default Distancer = ({ distance }) => {
  const convertDistance = (distance) => {
    if (distance < 1975) return `${Math.round(distance / 50) * 50} m`;
    else return `${Math.round(distance / 100) / 10} km`;
  };
  return <Text style={styles.text}>{convertDistance(distance)}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat_700Bold",
    color: "whitesmoke",
    fontSize: 60,
  },
});
