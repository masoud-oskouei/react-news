// if the pagination or other inputs change on the fetch form,
// this function activates and updates the relevent states
export const handleSubmitFetchForm = (e, _, { selectedPage }) => {
  e.preventDefault();
  _.setFetchParams({
    ..._.fetchParams,
    query: `${document.getElementById("fetchTerm").value.toLowerCase()}`,
    numericFilters: `created_at_i>${(
      new Date(document.getElementById("dateFrom").value).getTime() / 1000
    ).toString()},created_at_i<${(
      new Date(document.getElementById("dateTo").value).getTime() / 1000
    ).toString()}`,
  });
  _.setSelectedPage(selectedPage);
};
