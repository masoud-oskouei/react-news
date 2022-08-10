import FetchForm from "./FetchForm";
import NewsListFilters from "./NewsListFilters";
import NewsRows from "./NewsRows";
import NewsDetails from "./NewsDetails";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
import { newsPanelPageHasMounted } from "../functions/newsPanelPageHasMounted.js";
const NewsPanelPage = (props) => {
  const location = useLocation();
  useEffect(() => {
    newsPanelPageHasMounted(props._, props.routedFrom);
  }, [location]);
  return (
    <div>
      <div>
        {props._.showState.isShowingFetchForm &&
          props._.showState.activeList === "all" && <FetchForm _={props._} />}
        {props._.showState.isShowingFilterForm && (
          <NewsListFilters _={props._} />
        )}
        {props._.showState.activeList === "all" &&
          props._.showState.isShowingFetchForm && (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              style={{ marginBottom: "0.5em", marginTop: "0.01em" }}
            >
              <Grid item>
                <Pagination
                  color="primary"
                  showFirstButton
                  showLastButton
                  count={props._.fetchedNumbers.numberOfpagesFound}
                  page={props._.pageNumber}
                  onChange={(e, selectedPage) => {
                    props._.setPageNumber(selectedPage);
                    props._.setFilterParams({
                      filterTerm: "",
                      sortBy: "default",
                    });
                  }}
                />
              </Grid>
            </Grid>
          )}{" "}
      </div>

      <NewsRows _={props._} />
      <NewsDetails _={props._} />
    </div>
  );
};
export default NewsPanelPage;
