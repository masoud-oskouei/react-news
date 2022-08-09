import FetchForm from "./FetchForm";
import NewsListFilters from "./NewsListFilters";
import NewsRows from "./NewsRows";
import NewsDetails from "./NewsDetails";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
const NewsPanelPage = (props) => {
  useEffect(() => {
    console.log("props.newsList=", props._.newsList);
    console.log("props.favesList=", props._.favesList);
  }, []);
  const location = useLocation();
  useEffect(() => {
    props._.setShowState({
      ...props._.showState,
      isShowingFetchForm: props.routedFrom === "newspanel/*" ? true : false,
      isShowingFilterForm: props.routedFrom === "faves/*" ? true : false,
      activeList: props.routedFrom === "newspanel/*" ? "all" : "faves",
    });
    //props.setNewsDetails(null);
    props._.setFilterParams({
      filterTerm: "",
      sortBy: "default",
    });
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
      <NewsDetails routedFrom={":newsId"} _={props._} />
    </div>
  );
};
export default NewsPanelPage;
