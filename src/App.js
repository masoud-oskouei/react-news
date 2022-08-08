import { fetchData } from "./functions/fetchData";
import { fetchBecauseParamsChanged } from "./functions/fetchBecauseParamsChanged";
import { fetchBecausePageChanged } from "./functions/fetchBecausePageChanged";
import { fetchBecauseDetailsIdChanged } from "./functions/fetchBecauseDetailsIdChanged";
import { favesHandler } from "./functions/favesHandler";
import { handleMessage } from "./functions/handleMessage";
import { fetchStats } from "./functions/fetchStats";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage";
import NewsPanelPage from "./components/NewsPanelPage";
import ContactPage from "./components/ContactPage";
import NotFoundPage from "./components/NotFoundPage";
import CampaignIcon from "@mui/icons-material/Campaign";
import useStyles from "./components/useStyles.jsx";

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
} from "@mui/material";
////////////////////

//////////////////
const App = () => {
  const classes = useStyles();
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(false);
  const [showState, setShowState] = useState({
    isShowingFetchForm: false,
    isShowingFilterForm: false,
    activeList: "all",
  });
  const [fetchedNumbers, setFetchedNumbers] = useState({
    totalFound: 0,
    numberOfpagesFound: 0,
    pageShown: 1,
  });
  const [stats, setStats] = useState({});
  const [isShowingFetch, setIsShowingFetch] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [messageObject, setMessageObject] = useState(null);
  const [newsDetails, setNewsDetails] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
  const [favesList, setFavesList] = useState(
    JSON.parse(window.localStorage.getItem("faves"))
      ? JSON.parse(window.localStorage.getItem("faves"))
      : []
  );

  const [fetchParams, setFetchParams] = useState({
    query: "success",
    tags: "",
    numericFilters: ``,
    page: 0,
  });
  const [filterParams, setFilterParams] = useState({
    filterTerm: "",
    sortBy: "default",
  });

  const gotoFetchForm = () => {
    setIsShowingFetch(true);
  };
  const handleSubmitFetchForm = (e) => {
    if (e) {
      e.preventDefault();
    }

    setFetchParams({
      ...fetchParams,
      query: `${document.getElementById("fetchTerm").value.toLowerCase()}`,
      numericFilters: `created_at_i>${(
        new Date(document.getElementById("dateFrom").value).getTime() / 1000
      ).toString()},created_at_i<${(
        new Date(document.getElementById("dateTo").value).getTime() / 1000
      ).toString()}`,
    });
  };
  useEffect(() => {
    fetchStats.then((stats) => {
      setStats(stats);
    });
  }, []);

  useEffect(() => {
    fetchBecauseParamsChanged(
      fetchParams,
      setIsListLoading,
      fetchData,
      setNewsList,
      setFetchedNumbers,
      setPageNumber,
      setNewsDetails,
      setDetailsId
    );
  }, [fetchParams]);

  useEffect(() => {
    fetchBecausePageChanged(
      fetchParams,
      setIsListLoading,
      fetchData,
      setNewsList,
      setFetchedNumbers,
      pageNumber,
      setNewsDetails,
      setDetailsId
    );
  }, [pageNumber]);

  useEffect(() => {
    fetchBecauseDetailsIdChanged(
      detailsId,
      setIsModalOpen,
      setIsDetailsLoading,
      fetchData,
      setNewsDetails
    );
  }, [detailsId]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            <CampaignIcon className={classes.navIcon} />
            <nav>
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? { color: "#fc814a" } : { color: "#DBDFAC" }
                }
                className={classes.navLink}
              >
                {" "}
                Home{" "}
              </NavLink>
              |
              <NavLink
                to="/newspanel"
                style={({ isActive }) =>
                  isActive ? { color: "#fc814a" } : { color: "#DBDFAC" }
                }
                className={classes.navLink}
              >
                {" "}
                News Panel{" "}
              </NavLink>
              |
              <NavLink
                to="/faves"
                style={({ isActive }) =>
                  isActive ? { color: "#fc814a" } : { color: "#DBDFAC" }
                }
                className={classes.navLink}
              >
                {" "}
                Faves{" "}
              </NavLink>
              |
              <NavLink
                to="/contact"
                style={({ isActive }) =>
                  isActive ? { color: "#fc814a" } : { color: "#DBDFAC" }
                }
                className={classes.navLink}
              >
                {" "}
                Contact Us{" "}
              </NavLink>
            </nav>
          </Toolbar>
        </AppBar>
        <main>
          <div>
            <Container maxWidth="bg">
              <Routes>
                <Route path="/" element={<HomePage stats={stats} />} />
                <Route
                  path="newspanel/*"
                  element={
                    <NewsPanelPage
                      fetchedNumbers={fetchedNumbers}
                      routedFrom="newspanel/*"
                      setShowState={setShowState}
                      showState={showState}
                      setFilterParams={setFilterParams}
                      gotoFetchForm={gotoFetchForm}
                      fetchParams={fetchParams}
                      setFetchParams={setFetchParams}
                      newsList={newsList}
                      favesList={favesList}
                      setFavesList={setFavesList}
                      filterParams={filterParams}
                      favesHandler={favesHandler}
                      newsDetails={newsDetails}
                      setNewsDetails={setNewsDetails}
                      setDetailsId={setDetailsId}
                      isDetailsLoading={isDetailsLoading}
                      setIsDetailsLoading={setIsDetailsLoading}
                      isListLoading={isListLoading}
                      setPageNumber={setPageNumber}
                      pageNumber={pageNumber}
                      handleSubmitFetchForm={handleSubmitFetchForm}
                      setIsModalOpen={setIsModalOpen}
                      isModalOpen={isModalOpen}
                      setIsFetchingDetails={setIsFetchingDetails}
                      detailsId={detailsId}
                    />
                  }
                ></Route>
                <Route
                  path="faves/*"
                  element={
                    <NewsPanelPage
                      routedFrom="faves/*"
                      fetchedNumbers={fetchedNumbers}
                      setShowState={setShowState}
                      showState={showState}
                      favesList={favesList}
                      setFavesList={setFavesList}
                      filterParams={filterParams}
                      setFilterParams={setFilterParams}
                      favesHandler={favesHandler}
                      gotoFetchForm={gotoFetchForm}
                      fetchParams={fetchParams}
                      setFetchParams={setFetchParams}
                      newsList={newsList}
                      isShowingFetch={isShowingFetch}
                      newsDetails={newsDetails}
                      setDetailsId={setDetailsId}
                      setNewsDetails={setNewsDetails}
                      isDetailsLoading={isDetailsLoading}
                      setIsDetailsLoading={setIsDetailsLoading}
                      isListLoading={isListLoading}
                      setPageNumber={setPageNumber}
                      pageNumber={pageNumber}
                      handleSubmitFetchForm={handleSubmitFetchForm}
                      setIsModalOpen={setIsModalOpen}
                      isModalOpen={isModalOpen}
                      setIsFetchingDetails={setIsFetchingDetails}
                      detailsId={detailsId}
                    />
                  }
                />
                <Route
                  path="contact/*"
                  element={
                    <ContactPage
                      handleMessage={handleMessage}
                      isMessageSent={isMessageSent}
                      setIsMessageSent={setIsMessageSent}
                      messageObject={messageObject}
                      setMessageObject={setMessageObject}
                    />
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
};
export default App;
