export const favesHandler = (newsItem, _) => {
  console.log("favesHandler");
  let tempFavesList = [];
  if (_.favesList.includes(newsItem)) {
    console.log("was in");
    tempFavesList = [
      ..._.favesList.slice(0, _.favesList.indexOf(newsItem)),
      ..._.favesList.slice(_.favesList.indexOf(newsItem) + 1),
    ];
  } else {
    console.log("was not");
    tempFavesList = [..._.favesList, newsItem];
  }
  window.localStorage.setItem("faves", JSON.stringify(tempFavesList));
  _.setFavesList(tempFavesList);
};
