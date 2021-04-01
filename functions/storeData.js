import AsyncStorage from "@react-native-async-storage/async-storage";

export default storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@parkings", jsonValue);
  } catch (err) {
    // error reading value
    console.log(err);
  }
};
