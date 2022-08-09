import { Link } from "react-router-dom";
import "./HomePage.css";
import { dayLabels } from "../functions/makeDayLabels";
import useStyles from "./useStyles.jsx";
import { Typography } from "@mui/material";

const HomePage = (props) => {
  const classes = useStyles();
  const endPoint = "https://quickchart.io/chart?encoding=url&c=";
  const data = {
    type: "line",
    data: {
      labels: dayLabels,
      datasets: [
        {
          label: "Number of published news stories during past week",
          data: props._.stats,
        },
      ],
    },
  };
  return (
    <div className="homePage">
      <Typography variant="h3" className="title">
        Welcome
      </Typography>

      <Typography variant="h5" className="title">
        <Link to="newspanel" className={classes.bigLink}>
          Click here to enter the News world!
        </Link>
      </Typography>

      <img
        width="450px"
        src={`${endPoint + JSON.stringify(data)}`}
        alt=""
      ></img>
    </div>
  );
};
export default HomePage;
