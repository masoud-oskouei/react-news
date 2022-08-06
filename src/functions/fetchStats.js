import { fetchData } from "./fetchData";
export const fetchStats = new Promise(async (resolve, reject) => {
  let daysBeforeToday = [0, 1, 2, 3, 4, 5, 6];
  let x = 0;
  let requests = [];
  let statsLabled = [];
  daysBeforeToday.forEach(async (day) => {
    let fetchParams = {
      //query: "",
      tags: "story",
      numericFilters: `created_at_i>${(
        new Date().getTime() / 1000 -
        (day + 1) * 24 * 3600
      ) //yesterday in seconds
        .toString()},created_at_i<${(
        new Date().getTime() / 1000 -
        day * 24 * 3600
      ) //today in seconds
        .toString()}`,
    };

    requests.push(
      await new Promise((resolve, reject) => {
        let endPoint = "https://hn.algolia.com/api/v1/search?";
        fetchData(endPoint, fetchParams)
          .then((response) => {
            statsLabled = [
              ...statsLabled,
              { day: day, nbHits: response.nbHits },
            ];
            x += 1;
            resolve();
          })
          .catch((error) => {
            console.log(error);
            x += 1;
            reject();
          });
      })
    );
    if (x === 7) {
      statsLabled = statsLabled.sort((a, b) => {
        return b.day - a.day;
      });
      let stats = [];
      statsLabled.forEach((labledStat) => {
        stats.push(labledStat.nbHits);
      });
      resolve(stats);
    }
  });
});
