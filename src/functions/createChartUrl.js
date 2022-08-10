const createChartUrl = (stats, _) => {
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let today = new Date()
    .toLocaleString("en-us", { weekday: "long" })
    .slice(0, 3);
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
          data: stats,
        },
      ],
    },
  };
  _.setChartUrl(`${endPoint + JSON.stringify(chartApiParams)}`);
  _.setChartIsLoading(false);
};
export { createChartUrl };
