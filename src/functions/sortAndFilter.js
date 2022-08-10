import { sortFunctions } from "../functions/sortFunctions";
export const sortAndFilter = (list, _) => {
  return list
    .filter((newsItem, index) => {
      return (
        (newsItem.content &&
          newsItem.content
            .toLowerCase()
            .includes(_.filterParams.filterTerm.toLowerCase())) ||
        (newsItem.description &&
          newsItem.description
            .toLowerCase()
            .includes(_.filterParams.filterTerm)) ||
        (newsItem.title &&
          newsItem.title.toLowerCase().includes(_.filterParams.filterTerm))
      );
    })

    .sort((a, b) => {
      let compareFunc = sortFunctions[_.filterParams.sortBy]
        ? sortFunctions[_.filterParams.sortBy]
        : sortFunctions.default;
      return compareFunc(
        a[_.filterParams.sortBy] ? a[_.filterParams.sortBy] : "",
        b[_.filterParams.sortBy] ? b[_.filterParams.sortBy] : ""
      );
    });
};
