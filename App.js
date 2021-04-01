import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";

import {
  useFonts,
  Montserrat_300Light,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import Main from "./Main";

import colors from "./constants/colors";

import calculateDistance from "./functions/calculateDistance";
import divideIntoSectors from "./functions/divideIntoSectors";
import fetchData from "./functions/fetchData";
import getData from "./functions/getData";
import setDirection from "./functions/setDirection";
import sortByKey from "./functions/sortByKey";

export default function App() {
  const [location, setLocation] = useState(null);
  const [closest, setClosest] = useState(null);
  const [filters, setFilters] = useState([true, true, true, true]);
  const [updated, setUpdated] = useState(0);
  const [returner, setReturner] = useState(null);
  const [returner2, setReturner2] = useState(null);

  let [fontsLoaded] = useFonts({ Montserrat_300Light, Montserrat_700Bold });

  let sectors = [];
  let currentPositionIndex = null;
  let currentPositionArray = [];

  const watchPositionCallback = (location, sectors) => {
    setLocation(location);
    let distancesArray = [];
    currentPositionArray = [];

    // ustalenie aktualnego indeksu tablicy na podstawie lokalizacji
    currentPositionIndex = Math.floor(
      (Math.floor(location.coords.longitude * 10) / 10) * 2 - 10
    );

    // ustalenie tablicy z najblizszymi obiektami
    currentPositionArray.push(
      ...sectors[currentPositionIndex - 1],
      ...sectors[currentPositionIndex],
      ...sectors[currentPositionIndex + 1]
    );

    // ustalenie tablicy jesli nie ma obiektow w poblizu
    if (currentPositionArray.length === 0) {
      setClosest("null");
    } else {
      // filtrowanie czterech typu obiektów
      currentPositionArray.forEach((place, placeIndex) => {
        filters.forEach((filter, filterIndex) => {
          if (!filter && place.type - 1 == filterIndex) {
            currentPositionArray[placeIndex].show = false;
          }
        });
      });

      // ustalenie obiektów w których strone zmierzamy i ustalenie odleglosci do nich
      currentPositionArray.forEach((place, index) => {
        const heading = setDirection(
          location.coords.latitude,
          location.coords.longitude,
          place.latitude,
          place.longitude,
          location.coords.heading
        );

        const distance = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          place.latitude,
          place.longitude
        );
        if (
          (heading < 45 || heading > 315 || distance < 300) &&
          currentPositionArray[index].show !== false
        ) {
          let isHeading = false;
          if (
            typeof currentPositionArray[index].side === "number" &&
            distance >= 300
          ) {
            let objectHeading = currentPositionArray[index].side;
            let userHeading = location.coords.heading;
            if (objectHeading > 290) {
              if (userHeading < objectHeading) {
                if (userHeading > 180)
                  objectHeading - userHeading < 70
                    ? (isHeading = true)
                    : (isHeading = false);
                if (userHeading < 180)
                  360 - objectHeading + userHeading < 70
                    ? (isHeading = true)
                    : (isHeading = false);
              } else isHeading = true;
            } else if (objectHeading <= 290 || objectHeading >= 70) {
              Math.abs(objectHeading - userHeading) < 70
                ? (isHeading = true)
                : (isHeading = false);
            } else {
              if (userHeading > objectHeading) {
                if (userHeading < 180)
                  userHeading - objectHeading < 70
                    ? (isHeading = true)
                    : (isHeading = false);
                if (userHeading > 180)
                  360 - userHeading + objectHeading < 70
                    ? (isHeading = true)
                    : (isHeading = false);
              } else isHeading = true;
            }
          } else isHeading = true;
          if (isHeading) {
            distancesArray.push({
              name: place.name,
              distance,
              latitude: place.latitude,
              longitude: place.longitude,
              heading: heading,
              type: place.type,
              exit: place.exit || null,
              side: place.side || null,
            });
          }
        }
      });
      if (distancesArray.length !== 0)
        setClosest(sortByKey(distancesArray, "distance").slice(0, 3));
      else setClosest("null");
    }
  };

  useEffect(() => {
    (async () => {
      // const location2 = await Location.watchPositionAsync({
      //   accuracy: Location.Accuracy.Highest,
      //   timeInterval: 1500,
      //   distanceInterval: 10,
      // });
      if (returner !== null) {
        await returner.remove();
        //await new Promise((r) => setTimeout(r, 500));
      }
      let data = await getData();
      if (data === null) {
        await fetchData();
        data = await getData();
      }
      sectors = await divideIntoSectors(data);
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        console.log("Permissions error");
      }

      const location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1500,
          distanceInterval: 10,
        },
        (location) => {
          watchPositionCallback(location, sectors);
        }
      );
      setReturner(location);
      // setReturner2(location2);
      // if (returner2 !== null) {
      //   await returner2.remove();
      // }
    })();
  }, [filters, updated]);

  if (!fontsLoaded || location === null || location === undefined)
    return (
      <>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={60} color={colors.white} />
          {location === null || location === undefined ? (
            <Text style={styles.locationText}>Ustalanie lokalizacji</Text>
          ) : null}
        </View>
      </>
    );

  return (
    <>
      <StatusBar style="light" />
      <Main
        closest={closest}
        filters={filters}
        setFilters={setFilters}
        location={location}
        sectors={sectors}
        watchPositionCallback={watchPositionCallback}
        setUpdated={setUpdated}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  locationText: {
    textTransform: "lowercase",
    fontSize: 27,
    color: colors.white,
  },
});
