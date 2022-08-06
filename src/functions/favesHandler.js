export const favesHandler = (newsItem, favesList, setFavesList) => {
  console.log("favesHandler");
  let tempFavesList = [];
  if (favesList.includes(newsItem)) {
    console.log("was in");
    tempFavesList = [
      ...favesList.slice(0, favesList.indexOf(newsItem)),
      ...favesList.slice(favesList.indexOf(newsItem) + 1),
    ];
  } else {
    console.log("was not");
    tempFavesList = [...favesList, newsItem];
  }
  window.localStorage.setItem("faves", JSON.stringify(tempFavesList));
  setFavesList(tempFavesList);
};
