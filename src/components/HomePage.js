import { Link } from "react-router-dom";
import "./HomePage.css";
import { dayLabels } from "../functions/makeDayLabels";
import useStyles from "./useStyles.jsx";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
} from "@mui/material";

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
          data: props.stats,
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
