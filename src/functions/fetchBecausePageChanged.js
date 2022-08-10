import { fetchData } from "./fetchData.js";
export const fetchBecausePageChanged = (_) => {
  _.setIsListLoading(true);
  fetchData("https://hn.algolia.com/api/v1/search?", {
    ..._.fetchParams,
    page: _.pageNumber - 1,
  })
    .then((response) => {
      //console.log(response);
      let tempList = [];
      response.hits.forEach((newsItem) => {
        const tempItem = { ...newsItem };
        Object.keys(tempItem).forEach((key) => {
          if (key === "title" && !tempItem[key]) {
            tempItem[key] = "No title!";
          }
        });
        tempList = [
          ...tempList,
          {
            ...tempItem,
            urlToImage: `newspics/abstract (${parseInt(
              newsItem.objectID % 100
            )}).jpg`,
          },
        ];
      });
      _.setNewsList(tempList);
      _.setIsListLoading(false);
      _.setFetchedNumbers({
        totalFound: response.nbHits,
        numberOfpagesFound: response.nbPages,
        pageShown: response.page + 1,
      });
      _.setNewsDetails(null);
      _.setDetailsId(null);
    })
    .catch((error) => console.log(error));
};
