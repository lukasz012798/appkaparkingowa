import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default Name = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  side: {
    fontFamily: "Montserrat_700Bold",
    backgroundColor: "tomato",
    color: "whitesmoke",
    fontSize: 30,
    borderRadius: 3,
    padding: 3,
    marginBottom: 5,
  },
  text: {
    color: "whitesmoke",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
