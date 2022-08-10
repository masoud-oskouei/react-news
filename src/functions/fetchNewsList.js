// Fetch news list when the user clicks on a page number in the Pagination
// A useEffect executes this function.
import { fetchData } from "./fetchData.js";
export const fetchNewsList = (_) => {
  console.log("fetchNewsList");
  _.setIsListLoading(true);
  fetchData("https://hn.algolia.com/api/v1/search?", {
    ..._.fetchParams,
    page: _.selectedPage - 1,
  })
    .then((response) => {
      let tempList = [];
      response.hits.forEach((newsItem) => {
        const tempItem = { ...newsItem };
        Object.keys(tempItem).forEach((key) => {
          // if the value of the title is null change it
          if (key === "title" && !tempItem[key]) {
            tempItem[key] = "No title!";
          }
        });

        //assign an image for each news item and the add the news item to a temp list
        tempList = [
          ...tempList,
          {
            ...tempItem,
            // there are 100 photos saved in the public folder
            // we read the last 2 digits of the id and
            // assign a picture that has that 2 digits in its file name
            urlToImage: `newspics/abstract (${newsItem.objectID % 100}).jpg`,
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
    })
    .catch((error) => console.log(error));
};
