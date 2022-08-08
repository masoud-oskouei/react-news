export const fetchBecauseParamsChanged = (
  fetchParams,
  setIsListLoading,
  fetchData,
  setNewsList,
  setFetchedNumbers,
  setPageNumber,
  setNewsDetails,
  setDetailsId
) => {
  setIsListLoading(true);
  fetchData("https://hn.algolia.com/api/v1/search?", fetchParams)
    .then((response) => {
      console.log(response);
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
      setNewsList(tempList);
      setIsListLoading(false);

      setFetchedNumbers({
        totalFound: response.nbHits,
        numberOfpagesFound: response.nbPages,
        pageShown: response.page + 1,
      });
      setPageNumber(response.page + 1);
      setNewsDetails(null);
      setDetailsId(null);
    })
    .catch((error) => console.log(error));
};
