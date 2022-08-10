// the listFilters appears on top
import useStyles from "./useStyles.jsx";
import { Grid, Button, TextField } from "@mui/material";
import { goBacktoFetchForm } from "../functions/goBacktoFetchForm.js";
import { handleChangeFilterForm } from "../functions/handleChangeFilterForm.js";
function NewsListFilters(props) {
  const classes = useStyles();
  return (
    <div style={{ margin: ".5em" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <TextField
            id="filterTerm"
            label="Word to filter"
            variant="outlined"
            size="small"
            onChange={(e) => handleChangeFilterForm(e, props._)}
          />
        </Grid>
        <Grid item>
          <label
            className={classes.sortLabel}
            onChange={(e) => handleChangeFilterForm(e, props._)}
          >
            Sort by: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              Title
              <input type="radio" name="sortBy" value="title" defaultChecked />
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              Time
              <input type="radio" name="sortBy" value="created_at" />
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              Auther
              <input type="radio" name="sortBy" value="author" />
            </label>
          </label>
        </Grid>
        {props._.showState.activeList === "all" && (
          <Grid item xs={12}>
            <Button
              style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
              variant="contained"
              fullWidth
              color="primary"
              onClick={(e) => goBacktoFetchForm(e, props._)}
            >
              &lt;&lt;&lt; Go Back to Fetch Form{" "}
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
export default NewsListFilters;
