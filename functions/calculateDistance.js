export default calculateDistance = (
  x1 = Number,
  y1 = Number,
  x2 = Number,
  y2 = Number
) => {
  x = Math.abs(x1 - x2);
  y = Math.abs(y1 - y2) * Math.cos(((x1 + x2) / 2) * (Math.PI / 180));
  return Math.round(Math.sqrt(x * x + y * y) * 111.195 * 1000);
};
