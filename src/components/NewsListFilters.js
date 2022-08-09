// the listFilters appears on top
import React from "react";
import useStyles from "./useStyles.jsx";
import { Grid, Button, TextField } from "@mui/material";
function NewsListFilters(props) {
  const classes = useStyles();
  const setFilterParams = () => {
    props._.setFilterParams({
      filterTerm: document.getElementById("filterTerm").value,
      sortBy: document.querySelectorAll('input[name="sortBy"]:checked')[0]
        .value,
    });
  };
  return (
    <div style={{ margin: ".5em" }}>
      {" "}
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <TextField
            id="filterTerm"
            label="Word to filter"
            variant="outlined"
            size="small"
            onChange={setFilterParams}
          />
        </Grid>
        <Grid item>
          <label className={classes.sortLabel} onChange={setFilterParams}>
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
              onClick={() => {
                props._.setShowState({
                  ...props._.showState,
                  isShowingFetchForm: true,
                  isShowingFilterForm: false,
                });
                props._.setFilterParams({
                  filterTerm: "",
                  sortBy: "default",
                });
              }}
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
