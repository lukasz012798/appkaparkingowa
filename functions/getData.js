import AsyncStorage from "@react-native-async-storage/async-storage";

export default getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@parkings");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err);
  }
};
