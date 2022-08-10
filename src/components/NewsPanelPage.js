// This component is used both for "News Panel" route and "Faves" route
import FetchForm from "./FetchForm";
import NewsListFilters from "./NewsListFilters";
import NewsRows from "./NewsRows";
import NewsDetails from "./NewsDetails";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
import { newsPanelPageHasMounted } from "../functions/newsPanelPageHasMounted.js";
import { handleSubmitFetchForm } from "../functions/handleSubmitFetchForm.js";

const NewsPanelPage = (props) => {
  const location = useLocation();
  /*When the "React Router" causes this NewsPanelPage.js to mount,
  the below useEffect activates and changes the relevant states to show either "Faves" list or "All" list
    */
  useEffect(() => {
    newsPanelPageHasMounted(props._, props.routedFrom);
  }, [location]);
  return (
    <div>
      <div>
        {/* if  isShowingFetchForm is true we show the "fetch form" only if the active list is "All" */}
        {props._.showState.isShowingFetchForm &&
          props._.showState.activeList === "all" && <FetchForm _={props._} />}
        {props._.showState.isShowingFilterForm && (
          <NewsListFilters _={props._} />
        )}
        {/* if  isShowingFetchForm is true we show the "Pagination" only if the active list is "All" */}
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
                    handleSubmitFetchForm(e, props._, {
                      selectedPage: selectedPage,
                    }); //make API call
                  }}
                />
              </Grid>
            </Grid>
          )}{" "}
      </div>

      {/* the list of news items */}
      <NewsRows _={props._} />

      {/* This is the div containing the modal window and
      it is on the DOM whenever its parent is on the DOM.
      The Modal inside it appears and disappears based on the
      "isModalOpen" state.
      */}
      <NewsDetails _={props._} />
    </div>
  );
};
export default NewsPanelPage;
