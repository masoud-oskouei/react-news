import { Link } from "react-router-dom";
import useStyles from "./useStyles.jsx";
import { Typography, LinearProgress, CircularProgress } from "@mui/material";

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
      {props._.chartIsLoading && (
        <Typography variant="h5" className="title">
          <br />
          <br />
          Chart is loading
          <br />
          <CircularProgress />
        </Typography>
      )}
      {!props._.chartIsLoading && (
        <img width="650px" src={props._.chartUrl} alt=""></img>
      )}
    </div>
  );
};
export default HomePage;
