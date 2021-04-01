import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, Vibration } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import divideIntoSectors from "../functions/divideIntoSectors";
import updateData from "../functions/updateData";

export default Speedometer = ({
  location,
  setUpdated,
  watchPositionCallback,
}) => {
  const [unit, setUnit] = useState(false);
  const speed = location.coords.speed < 1 ? 0 : location.coords.speed;
  return (
    <TouchableHighlight
      underlayColor={"#111"}
      onPress={() => setUnit(!unit)}
      onLongPress={async () => {
        Vibration.vibrate([0, 300, 100, 300]);
        await updateData();
        setUpdated(Math.random());
      }}
      style={styles.container}
    >
      <>
        <MaterialIcons name="directions-car" size={90} color="whitesmoke" />
        <Text style={styles.paragraph}>
          {`${Math.floor(speed * 3.6 * (unit ? 0.621371 : 1))} ${
            unit ? "mph" : "km/h"
          }`}
        </Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 50,
    flexGrow: 1,
  },
  paragraph: {
    fontFamily: "Montserrat_700Bold",
    color: "whitesmoke",
    fontSize: 40,
  },
});
