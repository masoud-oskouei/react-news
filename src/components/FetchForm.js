import { useEffect } from "react";
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
  TextField,
} from "@mui/material";
import useStyles from "./useStyles.jsx";

const FetchForm = (props) => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "1em" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <TextField
            id="fetchTerm"
            label="Term"
            variant="outlined"
            defaultValue={props.fetchParams.query}
            size="small"
          />
        </Grid>
        <Grid item>
          <label
            htmlFor="dateFrom"
            //className={classes.dateLabel}
          >
            Date from
            <input
              className={classes.datePicker}
              id="dateFrom"
              type="date"
              defaultValue={`${new Date(new Date() - 365 * 24 * 3600 * 1000)
                .toISOString()
                .slice(0, 10)}`}
              min="2010-01-01"
              max={`${new Date().toISOString().slice(0, 10)}`}
              // min={`${new Date(new Date() - 10 * 365 * 24 * 3600 * 1000)
              //   .toISOString()
              //   .slice(0, 10)}`}
            ></input>
          </label>
        </Grid>
        <Grid item>
          <label
            htmlFor="dateTo"
            //className={classes.dateLabel}
          >
            Date to
            <input
              className={classes.datePicker}
              id="dateTo"
              type="date"
              defaultValue={`${new Date().toISOString().slice(0, 10)}`}
              //max={`${new Date().toISOString().slice(0, 10)}`}
            ></input>
          </label>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleSubmitFetchForm}
          >
            Fetch
          </Button>
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() =>
              props.setShowState({
                ...props.showState,
                isShowingFetchForm: false,
                isShowingFilterForm: true,
              })
            }
          >
            Filter below items &gt;&gt;&gt;
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default FetchForm;
