import { fetchData } from "./functions/fetchData";
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
  useEffect(() => {
    fetchStats.then((stats) => {
      setStats(stats);
    });
  }, []);

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
  /*
  useEffect(() => {
    setFetchParams({
      ...fetchParams,
      query: "success",
      numericFilters: `created_at_i>${`${new Date(
        new Date() - 365 * 24 * 3600 * 1000
      )
        .toISOString()
        .slice(0, 10)}`},created_at_i<${`${new Date()
        .toISOString()
        .slice(0, 10)}`}`,
    });
  }, []);
  
  */
  useEffect(() => {
    setIsListLoading(true);
    fetchData("https://hn.algolia.com/api/v1/search?", fetchParams)
      .then((response) => {
        console.log(response);
        let tempList = [];
        response.hits.forEach((newsItem) => {
          tempList = [
            ...tempList,
            {
              ...newsItem,
              urlToImage: `newspics/abstract (${parseInt(
                newsItem.objectID % 100
              )}).jpg`,
            },
          ];
        });
        setNewsList(tempList);
        setIsListLoading(false);

        setFetchedNumbers({
          totalFound: response.nbHits,
          numberOfpagesFound: response.nbPages,
          pageShown: response.page + 1,
        });
        setPageNumber(response.page + 1);
        setNewsDetails(null);
        setDetailsId(null);
      })
      .catch((error) => console.log(error));
  }, [fetchParams]);

  useEffect(() => {
    setIsListLoading(true);
    fetchData("https://hn.algolia.com/api/v1/search?", {
      ...fetchParams,
      page: pageNumber - 1,
    })
      .then((response) => {
        console.log(response);
        let tempList = [];
        response.hits.forEach((newsItem) => {
          const tempItem = { ...newsItem };
          Object.keys(tempItem).forEach((key) => {
            if (key === "title" && !tempItem[key]) {
              tempItem[key] = "No title!";
            }
          });
          tempList = [
            ...tempList,
            {
              ...tempItem,
              urlToImage: `newspics/abstract (${parseInt(
                newsItem.objectID % 100
              )}).jpg`,
            },
          ];
        });
        setNewsList(tempList);
        setIsListLoading(false);
        setFetchedNumbers({
          totalFound: response.nbHits,
          numberOfpagesFound: response.nbPages,
          pageShown: response.page + 1,
        });
        setNewsDetails(null);
        setDetailsId(null);
      })
      .catch((error) => console.log(error));
  }, [pageNumber]);
  useEffect(() => {
    if (detailsId) {
      setIsModalOpen(true);
      setIsDetailsLoading(true);
      fetchData(`https://hn.algolia.com/api/v1/items/${detailsId}`, {})
        .then((response) => {
          console.log("fetched data for new detailsId=", response);
          const tempItem = { ...response };
          Object.keys(tempItem).forEach((key) => {
            if (key === "title" && !tempItem[key]) {
              tempItem[key] = "No title!";
            }
          });
          setNewsDetails(tempItem);
        })
        .finally(() => {
          setIsDetailsLoading(false);
        });
    }
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
