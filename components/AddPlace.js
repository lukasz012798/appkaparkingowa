import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";

export default AddPlace = ({ location, setShowFormModal, setFormLocation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setFormLocation(location);
        setShowFormModal(true);
      }}
    >
      <Feather name="plus" size={40} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    right: 10,
  },
});
