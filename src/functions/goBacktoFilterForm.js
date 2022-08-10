//show filterForm and hide fetchForm

export const goBacktoFilterForm = (e, _) => {
  _.setShowState({
    ..._.showState,
    isShowingFetchForm: false,
    isShowingFilterForm: true,
  });
};
