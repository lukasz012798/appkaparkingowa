export default divideIntoSectors = async (data) => {
  let sectors = [];
  for (let i = 0; i < 23; i += 1) {
    sectors[i] = [];
  }
  if (data !== undefined && data !== null) {
    data.forEach((element) => {
      sectors[
        Math.floor((Math.floor(element.longitude * 10) / 10) * 2 - 10)
      ].push(element);
    });
  }
  return sectors;
};
