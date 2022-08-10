import { fetchData } from "./fetchData.js";
export const fetchBecauseParamsChanged = (_) => {
  _.setIsListLoading(true);
  fetchData("https://hn.algolia.com/api/v1/search?", _.fetchParams)
    .then((response) => {
      //console.log(response);
      let tempList = [];
      response.hits.forEach((newsItem) => {
        tempList = [
          ...tempList,
          {
            ...newsItem,
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
      _.setPageNumber(response.page + 1);
      _.setNewsDetails(null);
      _.setDetailsId(null);
    })
    .catch((error) => console.log(error));
};
