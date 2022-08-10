//add or remove a newsItem to/from the favesList
export const favesHandler = (newsItem, _) => {
  //setting the state in React is asynchronous, so we create a temp variable,
  // change it, save it to the local storage
  // and at last perform "setting the state"
  let tempFavesList = [];

  //if the newsItem is found in the faves list remove it otherwise add it
  if (_.favesList.includes(newsItem)) {
    tempFavesList = [
      ..._.favesList.slice(0, _.favesList.indexOf(newsItem)),
      ..._.favesList.slice(_.favesList.indexOf(newsItem) + 1),
    ];
  } else {
    tempFavesList = [..._.favesList, newsItem];
  }

  //save the favesList to the local storage
  window.localStorage.setItem("faves", JSON.stringify(tempFavesList));

  //update the favesList state
  _.setFavesList(tempFavesList);
};
