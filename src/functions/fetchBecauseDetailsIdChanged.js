import { fetchData } from "./fetchData.js";
export const fetchBecauseDetailsIdChanged = (_) => {
  if (_.detailsId) {
    _.setIsModalOpen(true);
    _.setIsDetailsLoading(true);
    fetchData(`https://hn.algolia.com/api/v1/items/${_.detailsId}`, {})
      .then((response) => {
        //console.log("fetched data for new detailsId=", response);
        const tempItem = { ...response };
        Object.keys(tempItem).forEach((key) => {
          if (key === "title" && !tempItem[key]) {
            tempItem[key] = "No title!";
          }
        });
        _.setNewsDetails(tempItem);
      })
      .finally(() => {
        _.setIsDetailsLoading(false);
      });
  }
};
