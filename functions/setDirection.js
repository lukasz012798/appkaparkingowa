export default setDirection = (x1, y1, x2, y2, heading) => {
  let a, b, c;
  if (x1 < x2) {
    b = Math.abs(y1 - y2) * Math.cos(((x1 + x2) / 2) * (Math.PI / 180));
    c = Math.abs(x2 - x1);
  } else if (x1 > x2) {
    c = Math.abs(y1 - y2) * Math.cos(((x1 + x2) / 2) * (Math.PI / 180));

    b = Math.abs(x2 - x1);
  }
  a = Math.sqrt(b * b + c * c);

  const nominator = a * a + b * b - c * c;
  const denominator = 2 * a * b;
  const equation = Math.acos(nominator / denominator);
  const angle = (equation * 180) / Math.PI;

  let globalAngle = 0;

  if (x1 < x2 && y1 > y2) globalAngle = 270 + angle;
  else if (x1 < x2 && y1 < y2) globalAngle = 90 - angle;
  else if (x1 > x2 && y1 > y2) globalAngle = 180 + angle;
  else if (x1 > x2 && y1 < y2) globalAngle = 180 - angle;

  if (heading < globalAngle) return globalAngle - heading;
  else if (heading > globalAngle) return 360 - heading + globalAngle;
  else return 0;
};
