export const handleSubmitFetchForm = (e, _) => {
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
};
