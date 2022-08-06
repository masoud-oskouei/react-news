export const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let today = new Date().toLocaleString("en-us", { weekday: "long" }).slice(0, 3);
while (dayLabels[6] !== today) {
  dayLabels.unshift(dayLabels.pop());
}
