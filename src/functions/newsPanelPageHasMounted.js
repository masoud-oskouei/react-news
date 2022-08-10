// when newsPanelPage mounts, this functions decides what to show
// based on the route that has activated newsPanelPage
export const newsPanelPageHasMounted = (_, routedFrom) => {
  _.setShowState({
    ..._.showState,
    isShowingFetchForm: routedFrom === "newspanel/*" ? true : false,
    isShowingFilterForm: routedFrom === "faves/*" ? true : false,
    activeList: routedFrom === "newspanel/*" ? "all" : "faves",
  });
  _.setFilterParams({
    filterTerm: "",
    sortBy: "default",
  });
};
