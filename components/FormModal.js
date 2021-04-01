import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import colors from "../constants/colors";

export default FormModal = ({ location, setShowFormModal }) => {
  const [name, onChangeName] = useState("");
  const [type, onChangeType] = useState("");
  const [note, onChangeNote] = useState("");

  const sendData = () => {
    fetch("http://a-parking.herokuapp.com/api/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        type,
        heading: Number(location.coords.heading),
        note,
      }),
    });
    onChangeName("");
    onChangeType("");
    onChangeNote("");
    setShowFormModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nazwa</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeName(text)}
        value={name}
      />
      <Text style={styles.text}>Typ</Text>
      <TextInput
        keyboardType={"number-pad"}
        style={styles.input}
        onChangeText={(text) => onChangeType(text)}
        value={type}
      />
      <Text style={styles.text}>Notka</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeNote(text)}
        value={note}
      />
      <TouchableHighlight style={styles.submitBtn} onPress={sendData}>
        <Text style={[styles.text, styles.btnText]}>Wyślij</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.submitBtn}
        onPress={() => setShowFormModal(false)}
      >
        <Text style={[styles.text, styles.btnText]}>Zamknij</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    height: "100%",
  },
  input: {
    height: 40,
    width: "70%",
    borderColor: colors.white,
    borderWidth: 3,
    borderRadius: 7,
    paddingHorizontal: 10,
    color: colors.white,
    marginBottom: 20,
    marginTop: 5,
    fontFamily: "Montserrat_300Light",
  },
  submitBtn: {
    margin: 20,
    height: 70,
    width: 200,
    backgroundColor: "white",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  text: {
    fontFamily: "Montserrat_700Bold",
    color: colors.white,
    textTransform: "uppercase",
  },
  btnText: {
    color: colors.black,
  },
});
