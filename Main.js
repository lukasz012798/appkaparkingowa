import React, { useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

import AddPlace from "./components/AddPlace";
import Distancer from "./components/Distancer";
import Filters from "./components/Filters";
import FormModal from "./components/FormModal";
import Name from "./components/Name";
import NextTwo from "./components/NextTwo";
import NoNearby from "./components/NoNearby";
import ObjectIcon from "./components/ObjectIcon";
import Speedometer from "./components/Speedometer";

import colors from "./constants/colors";

export default Main = ({
  closest,
  filters,
  setFilters,
  location,
  sectors,
  setUpdated,
  watchPositionCallback,
}) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [formLocation, setFormLocation] = useState(null);

  return (
    <View style={styles.container}>
      <Modal
        style={{ backgroundColor: colors.black }}
        animationType={"slide"}
        statusBarTranslucent
        visible={showFormModal}
      >
        <FormModal
          location={formLocation}
          setShowFormModal={setShowFormModal}
        />
      </Modal>
      <View style={styles.objectInfo}>
        {closest !== null ? (
          <>
            {closest === "null" ? (
              <NoNearby />
            ) : (
              <>
                <ObjectIcon distance={closest[0].distance} place={closest[0]} />
                {closest[0].distance >= 300 && (
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Distancer distance={closest[0].distance} />
                  </View>
                )}
                <Name name={closest[0].name} side={closest[0].side} />
              </>
            )}
          </>
        ) : (
          <ActivityIndicator
            style={{ marginTop: 60 }}
            size={120}
            color={colors.white}
          />
        )}
      </View>

      <NextTwo
        places={
          closest === null || closest === "null" ? closest : closest.slice(1, 3)
        }
        isLoading={closest === null || closest === "null"}
      />

      <Speedometer
        location={location}
        watchPositionCallback={watchPositionCallback}
        setUpdated={setUpdated}
      />
      <AddPlace
        setShowFormModal={setShowFormModal}
        location={location}
        setFormLocation={setFormLocation}
      />
      <Filters
        filters={filters}
        location={location}
        setFilters={setFilters}
        sectors={sectors}
        watchPositionCallback={watchPositionCallback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    flexWrap: "wrap",
  },
  objectInfo: {
    alignItems: "center",
    backgroundColor: "#111",
    borderBottomColor: "#333",
    borderBottomWidth: 2,
    display: "flex",
    paddingVertical: 40,
    width: "100%",
    height: "37%",
  },
  paragraph: {
    color: "whitesmoke",
    textTransform: "uppercase",
  },
  settingsIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  updateButton: {
    alignSelf: "flex-end",
    marginRight: 30,
    marginBottom: 30,
  },
});
