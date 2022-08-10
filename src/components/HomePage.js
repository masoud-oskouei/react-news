//The home page which the user encounters first
import { Link } from "react-router-dom";
import useStyles from "./useStyles.jsx";
import { Typography, CircularProgress } from "@mui/material";

const HomePage = (props) => {
  const classes = useStyles();
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h3" className="title">
        Welcome
      </Typography>
      <Typography variant="h5" className="title">
        <Link to="newspanel" className={classes.bigLink}>
          Click here to enter the News world!
        </Link>
      </Typography>
      {props._.chartIsLoading && ( //chart is being prepared
        <Typography variant="h5" className="title">
          <br />
          <br />
          Chart is loading
          <br />
          <CircularProgress />
        </Typography>
      )}
      {!props._.chartIsLoading && ( //chart is ready
        // This is an image whose "src" is a special url. This url is created by us and contains chart data.
        // the server creates an image based on the chart data and returns it
        <img width="650px" src={props._.chartUrl} alt=""></img>
      )}
    </div>
  );
};
export default HomePage;
