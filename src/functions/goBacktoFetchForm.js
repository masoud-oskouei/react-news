//show fetchForm and hide filterForm
export const goBacktoFetchForm = (e, _) => {
  _.setShowState({
    ..._.showState,
    isShowingFetchForm: true,
    isShowingFilterForm: false,
  });
  _.setFilterParams({
    filterTerm: "",
    sortBy: "default",
  });
};
