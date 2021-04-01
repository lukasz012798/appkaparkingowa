export default sortByKey = (array, key) => {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

// źródło: https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
