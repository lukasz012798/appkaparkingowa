import storeData from "./storeData";

const url = "http://a-parking.herokuapp.com/api";

export default fetchData = async () => {
  const resp = await fetch(url).catch((err) => console.log(err));
  const data = await resp.json();
  await storeData(data);
};
