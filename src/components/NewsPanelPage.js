import FetchForm from "./FetchForm";
import NewsListFilters from "./NewsListFilters";
import NewsRows from "./NewsRows";
import NewsDetails from "./NewsDetails";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Typography, Grid, Modal, Box } from "@mui/material";
import { Pagination, Button } from "@mui/material";
const NewsPanelPage = (props) => {
  useEffect(() => {
    console.log("props.newsList=", props.newsList);
    console.log("props.favesList=", props.favesList);
  }, []);
  const location = useLocation();
  useEffect(() => {
    props.setShowState({
      ...props.showState,
      isShowingFetchForm: props.routedFrom === "newspanel/*" ? true : false,
      isShowingFilterForm: props.routedFrom === "faves/*" ? true : false,
      activeList: props.routedFrom === "newspanel/*" ? "all" : "faves",
    });
    //props.setNewsDetails(null);
    props.setFilterParams({
      filterTerm: "",
      sortBy: "default",
    });
  }, [location]);
  return (
    <div>
      <div>
        {/* <h4>Search News On The Server </h4> */}
        {props.showState.isShowingFetchForm &&
          props.showState.activeList === "all" && (
            <FetchForm
              fetchParams={props.fetchParams}
              setFetchParams={props.setFetchParams}
              setShowState={props.setShowState}
              showState={props.showState}
              handleSubmitFetchForm={props.handleSubmitFetchForm}
            />
          )}
        {props.showState.isShowingFilterForm && (
          <NewsListFilters
            setFilterParams={props.setFilterParams}
            filterParams={props.filterParams}
            setShowState={props.setShowState}
            showState={props.showState}
            fetchParams={props.fetchParams}
          />
        )}
        {props.showState.activeList === "all" &&
          props.showState.isShowingFetchForm && (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              style={{ marginBottom: "0.5em", marginTop: "0.01em" }}
            >
              {/* <Grid item>
              <Typography variant="subtitle2">
                Total Items Found= {props.fetchedNumbers.totalFound}
                &nbsp;&nbsp;&nbsp;&nbsp; Showing page: <b>{props.pageNumber}</b> 
              </Typography>
            </Grid>*/}
              <Grid item>
                <Pagination
                  color="primary"
                  showFirstButton
                  showLastButton
                  count={props.fetchedNumbers.numberOfpagesFound}
                  page={props.pageNumber}
                  onChange={(e, selectedPage) => {
                    props.setPageNumber(selectedPage);
                    props.setFilterParams({
                      filterTerm: "",
                      sortBy: "default",
                    });
                  }}
                />
              </Grid>
            </Grid>
          )}{" "}
      </div>

      <NewsRows
        newsList={props.newsList}
        favesList={props.favesList}
        setFavesList={props.setFavesList}
        filterParams={props.filterParams}
        favesHandler={props.favesHandler}
        showState={props.showState}
        isListLoading={props.isListLoading}
        setDetailsId={props.setDetailsId}
        setIsModalOpen={props.setIsModalOpen}
        setIsDetailsLoading={props.setIsDetailsLoading}
        detailsId={props.detailsId}
      />
      <NewsDetails
        routedFrom={":newsId"}
        setDetailsId={props.setDetailsId}
        newsDetails={props.newsDetails}
        isDetailsLoading={props.isDetailsLoading}
        setIsDetailsLoading={props.setIsDetailsLoading}
        setIsModalOpen={props.setIsModalOpen}
        isModalOpen={props.isModalOpen}
        setIsFetchingDetails={props.setIsFetchingDetails}
        detailsId={props.detailsId}
      />
      {/* <Routes>
        <Route
          path=":newsId"
          element={
            <NewsDetails
              routedFrom={":newsId"}
              setDetailsId={props.setDetailsId}
              newsDetails={props.newsDetails}
              isDetailsLoading={props.isDetailsLoading}
              setIsDetailsLoading={props.setIsDetailsLoading}
              setIsModalOpen={props.setIsModalOpen}
              isModalOpen={props.isModalOpen}
              setIsFetchingDetails={props.setIsFetchingDetails}
              detailsId={props.detailsId}
            />
          }
        ></Route>
        <Route
          path="*"
          element={
            <NewsDetails
              isNotSelected={true}
              setDetailsId={props.setDetailsId}
              newsDetails={props.newsDetails}
              setIsDetailsLoading={props.setIsDetailsLoading}
              setIsFetchingDetails={props.setIsFetchingDetails}
              detailsId={props.detailsId}
            />
          }
        ></Route>
      </Routes> */}
    </div>
  );
};
export default NewsPanelPage;
