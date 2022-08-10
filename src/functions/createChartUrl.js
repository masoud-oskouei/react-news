/* Creates the url address that will be used as the "src" value of the <img>
which shows the chart on the HomePage
*/
const createChartUrl = (stats, _) => {
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let today = new Date() //find out what is today's abbreviation
    .toLocaleString("en-us", { weekday: "long" })
    .slice(0, 3);

  /*rotate the "dayLabels" until the last item is today
   after doing so the dayLabels will be in the correct order
   to put on the x-Axis of the chart*/
  while (dayLabels[6] !== today) {
    dayLabels.unshift(dayLabels.pop());
  }

  const endPoint = "https://quickchart.io/chart?encoding=url&c=";
  const chartApiParams = {
    type: "line",
    data: {
      labels: dayLabels,
      datasets: [
        {
          label: "Number of published news stories during past week",
          data: stats, //stats are created by "fetchStats" function
        },
      ],
    },
  };

  //the url address that will be used as the "src" value of the <img> containing the chart
  _.setChartUrl(`${endPoint + JSON.stringify(chartApiParams)}`);

  _.setChartIsLoading(false);
};
export { createChartUrl };
