import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import LoadingBlock from "./LoadingBlock";
import objectIcons from "../constants/objectIcons";
import objectColors from "../constants/objectColors";
import colors from "../constants/colors";

export default NextTwo = ({ isLoading, places }) => {
  return (
    <View style={styles.container}>
      {!isLoading ? (
        <>
          {places.map((place) => (
            <React.Fragment key={place.distance * Math.random()}>
              <View style={styles.placeContainer}>
                {place.exit && (
                  <>
                    <Text style={styles.exit}>{place.exit}</Text>
                    <MaterialIcons
                      name="transit-enterexit"
                      size={25}
                      color={objectColors[place.type]}
                    />
                  </>
                )}
                <MaterialIcons
                  name={objectIcons[place.type]}
                  size={25}
                  color={objectColors[place.type]}
                />
                <Text style={styles.placeInfo}>
                  <Text style={styles.placeInfoName}>{place.name} </Text>
                  {Math.round((place.distance * 0.001 + Number.EPSILON) * 10) /
                    10}
                  {` km `}
                </Text>
              </View>
            </React.Fragment>
          ))}
        </>
      ) : places === "null" ? null : (
        <>
          <LoadingBlock width={Math.random() * 80 + 100} />
          <LoadingBlock width={Math.random() * 80 + 100} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    display: "flex",
    height: 135,
    width: "100%",
  },
  exit: {
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
    color: colors.blue,
  },
  placeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    height: 60,
    marginTop: 3,
    paddingHorizontal: 30,
  },
  placeInfo: {
    color: "whitesmoke",
    fontFamily: "Montserrat_300Light",
    textTransform: "uppercase",
    fontSize: 24,
    marginLeft: 5,
  },
  placeInfoName: {
    fontFamily: "Montserrat_700Bold",
  },
  side: {
    color: "tomato",
    fontFamily: "Montserrat_700Bold",
  },
});
