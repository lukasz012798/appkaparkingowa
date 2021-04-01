import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import divideIntoSectors from "../functions/divideIntoSectors";
import fetchData from "../functions/fetchData";
import getData from "../functions/getData";
import colors from "../constants/colors";

export default Filters = ({
  filters,
  location,
  setFilters,
  watchPositionCallback,
}) => {
  const { autohof, raststatte, parkplatz, toiletteParkplatz } = colors;

  const switchFilter = async (index) => {
    setFilters([
      ...filters.slice(0, index),
      !filters[index],
      ...filters.slice(index + 1),
    ]);
  };

  useEffect(() => {
    async function anyName() {
      let data = await getData();
      if (data === null) {
        await fetchData();
        data = await getData();
      }
      let sectors = await divideIntoSectors(data);

      watchPositionCallback(location, sectors);
    }
    anyName();
  }, [filters]);

  return (
    <View style={styles.filtersContainer}>
      <View style={styles.filters}>
        <TouchableOpacity
          onPress={() => switchFilter(0)}
          style={[
            styles.filter,
            { backgroundColor: !filters[0] ? colors.inactive : colors.active },
          ]}
        >
          <MaterialIcons
            name="transit-enterexit"
            size={24}
            color={colors.white}
          />
          <MaterialIcons
            name="local-gas-station"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => switchFilter(1)}
          style={[
            styles.filter,
            {
              backgroundColor: !filters[1] ? colors.inactive : colors.active,
            },
          ]}
        >
          <MaterialIcons
            name="local-gas-station"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => switchFilter(2)}
          style={[
            styles.filter,
            {
              backgroundColor: !filters[2] ? colors.inactive : colors.active,
            },
          ]}
        >
          <MaterialIcons name="local-parking" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => switchFilter(3)}
          style={[
            styles.filter,
            {
              backgroundColor: !filters[3] ? colors.inactive : colors.active,
            },
          ]}
        >
          <MaterialIcons name="wc" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  container: {
    backgroundColor: "#111",
    height: "100%",
    paddingTop: 100,
    display: "flex",
    alignItems: "center",
  },
  inactive: {
    backgroundColor: colors.white,
  },
  filterIcon: {
    width: "100%",
    paddingLeft: 30,
    paddingVertical: 10,
  },
  filtersContainer: {
    width: "100%",
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  filter: {
    width: "22%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 4,
    flexDirection: "row",
  },
});
