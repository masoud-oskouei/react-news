import { fetchData } from "./functions/fetchData";
import { fetchBecauseParamsChanged } from "./functions/fetchBecauseParamsChanged";
import { fetchBecausePageChanged } from "./functions/fetchBecausePageChanged";
import { fetchBecauseDetailsIdChanged } from "./functions/fetchBecauseDetailsIdChanged";
import { favesHandler } from "./functions/favesHandler";
import { handleMessage } from "./functions/handleMessage";
import { fetchStats } from "./functions/fetchStats";
import { goBacktoFilterForm } from "./functions/goBacktoFilterForm";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage";
import NewsPanelPage from "./components/NewsPanelPage";
import ContactPage from "./components/ContactPage";
import NotFoundPage from "./components/NotFoundPage";
import CampaignIcon from "@mui/icons-material/Campaign";
import useStyles from "./components/useStyles.jsx";
import { AppBar, CssBaseline, Toolbar, Container } from "@mui/material";
////////////////////

//////////////////
const App = () => {
  const classes = useStyles();
  //states:

  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //!!
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
  //add the states and setStates into the object "_"
  //we will easily pass the "_" down the tree to all components
  const _ = {};
  _.isModalOpen = isModalOpen;
  _.setIsModalOpen = setIsModalOpen;

  _.isFetchingDetails = setIsFetchingDetails;
  _.isFetchingDetails = isFetchingDetails;

  _.pageNumber = pageNumber;
  _.setPageNumber = setPageNumber;

  _.isDetailsLoading = isDetailsLoading;
  _.setIsDetailsLoading = setIsDetailsLoading;

  _.isListLoading = isListLoading;
  _.setIsListLoading = setIsListLoading;

  _.stats = stats;
  _.setStats = setStats;

  _.isShowingFetch = isShowingFetch;
  _.setIsShowingFetch = setIsShowingFetch;

  _.newsList = newsList;
  _.setNewsList = setNewsList;

  _.isMessageSent = isMessageSent;
  _.setIsMessageSent = setIsMessageSent;

  _.messageObject = messageObject;
  _.setMessageObject = setMessageObject;

  _.newsDetails = newsDetails;
  _.setNewsDetails = setNewsDetails;

  _.detailsId = detailsId;
  _.setDetailsId = setDetailsId;

  _.favesList = favesList;
  _.setFavesList = setFavesList;

  _.showState = showState;
  _.setShowState = setShowState;

  _.fetchedNumbers = fetchedNumbers;
  _.setFetchedNumbers = setFetchedNumbers;

  _.fetchParams = fetchParams;
  _.setFetchParams = setFetchParams;

  _.filterParams = filterParams;
  _.setFilterParams = setFilterParams;

  /////end of state declaration

  useEffect(() => {
    fetchStats(setStats, fetchData);
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
                <Route path="/" element={<HomePage _={_} />} />
                <Route
                  path="newspanel/*"
                  element={<NewsPanelPage _={_} routedFrom="newspanel/*" />}
                ></Route>
                <Route
                  path="faves/*"
                  element={<NewsPanelPage _={_} routedFrom="faves/*" />}
                />
                <Route path="contact/*" element={<ContactPage _={_} />} />
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
