//if any input changes on the filter form, this functions updates the relevent state
export const handleChangeFilterForm = (e, _) => {
  _.setFilterParams({
    filterTerm: document.getElementById("filterTerm").value,
    sortBy: document.querySelectorAll('input[name="sortBy"]:checked')[0].value,
  });
};
