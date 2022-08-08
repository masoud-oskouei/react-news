export const fetchBecauseDetailsIdChanged = (
  detailsId,
  setIsModalOpen,
  setIsDetailsLoading,
  fetchData,
  setNewsDetails
) => {
  if (detailsId) {
    setIsModalOpen(true);
    setIsDetailsLoading(true);
    fetchData(`https://hn.algolia.com/api/v1/items/${detailsId}`, {})
      .then((response) => {
        console.log("fetched data for new detailsId=", response);
        const tempItem = { ...response };
        Object.keys(tempItem).forEach((key) => {
          if (key === "title" && !tempItem[key]) {
            tempItem[key] = "No title!";
          }
        });
        setNewsDetails(tempItem);
      })
      .finally(() => {
        setIsDetailsLoading(false);
      });
  }
};
