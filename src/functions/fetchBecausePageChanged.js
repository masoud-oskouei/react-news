export const fetchBecausePageChanged = (
  fetchParams,
  setIsListLoading,
  fetchData,
  setNewsList,
  setFetchedNumbers,
  pageNumber,
  setNewsDetails,
  setDetailsId
) => {
  setIsListLoading(true);
  fetchData("https://hn.algolia.com/api/v1/search?", {
    ...fetchParams,
    page: pageNumber - 1,
  })
    .then((response) => {
      console.log(response);
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
      setNewsList(tempList);
      setIsListLoading(false);
      setFetchedNumbers({
        totalFound: response.nbHits,
        numberOfpagesFound: response.nbPages,
        pageShown: response.page + 1,
      });
      setNewsDetails(null);
      setDetailsId(null);
    })
    .catch((error) => console.log(error));
};
