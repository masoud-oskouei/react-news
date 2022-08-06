export const sortFunctions = {
  time: (a, b) => {
    let aT = new Date(a).getTime(); //convert a to milliseconds
    let bT = new Date(b).getTime(); //convert b to milliseconds
    return aT - bT; //This means sorting in ascending order
  },
  default: (a, b) => {
    var shapeStringForCompare = (string) =>
      (string == null ? "" : string)
        .replace(/^\s+/, "") //convert a to a good shape
        .replace(/[.*+?^${}()|\[\]\\'"\u2018\u2019\u201C\u201D\>\<,\/]/g, "")
        .toLowerCase();

    //This means sorting in ascending order
    return shapeStringForCompare(a) > shapeStringForCompare(b) ? 1 : -1;
  },
};
