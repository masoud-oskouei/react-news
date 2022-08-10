/*This form is for searching the neas on the server
The user fills this form and when clicks the "fetch" button
the appropriate useEffect in the App.js component prforms the API call.

*/
import { handleSubmitFetchForm } from "../functions/handleSubmitFetchForm";
import { goBacktoFilterForm } from "../functions/goBacktoFilterForm";
import { Grid, Button, TextField } from "@mui/material";
import useStyles from "./useStyles.jsx";

const FetchForm = (props) => {
  const classes = useStyles();

  return (
    <div style={{ margin: ".5em" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <TextField
            id="fetchTerm"
            label="Term"
            variant="outlined"
            defaultValue={props._.fetchParams.query}
            size="small"
          />
        </Grid>
        <Grid item>
          <label htmlFor="dateFrom">
            Date from
            <input
              className={classes.datePicker}
              id="dateFrom"
              type="date"
              defaultValue={`${new Date(new Date() - 365 * 24 * 3600 * 1000) // a year ago
                .toISOString()
                .slice(0, 10)}`}
              min="2010-01-01"
              max={`${new Date().toISOString().slice(0, 10)}`}
            ></input>
          </label>
        </Grid>
        <Grid item>
          <label htmlFor="dateTo">
            Date to
            <input
              className={classes.datePicker}
              id="dateTo"
              type="date"
              defaultValue={`${new Date().toISOString().slice(0, 10)}`} //today
            ></input>
          </label>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleSubmitFetchForm(e, props._, { selectedPage: 1 }); //make API call
            }}
          >
            Fetch
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => {
              goBacktoFilterForm(e, props._); // bring up the filter form
            }}
          >
            Filter below items &gt;&gt;&gt;
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default FetchForm;
