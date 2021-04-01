import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import objectIcons from "../constants/objectIcons";
import objectColors from "../constants/objectColors";
import colors from "../constants/colors";

export default ObjectIcon = ({ distance, place }) => {
  return (
    <View style={styles.objectIcon}>
      {place.type === 1 && (
        <View style={styles.exitInfo}>
          <Text style={styles.exitNumber}>{place.exit}</Text>
          <MaterialIcons
            name="transit-enterexit"
            size={100}
            color={objectColors[place.type]}
          />
        </View>
      )}
      <MaterialIcons
        name={objectIcons[place.type]}
        size={distance >= 300 ? 100 : 160}
        color={objectColors[place.type]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  exitInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  exitNumber: {
    fontFamily: "Montserrat_700Bold",
    color: colors.blue,
    fontSize: 80,
  },
  objectIcon: {
    display: "flex",
    flexDirection: "row",
  },
});
