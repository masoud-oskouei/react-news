import { fetchBecauseParamsChanged } from "./functions/fetchBecauseParamsChanged";
import { fetchBecausePageChanged } from "./functions/fetchBecausePageChanged";
import { fetchBecauseDetailsIdChanged } from "./functions/fetchBecauseDetailsIdChanged";
import { fetchStats } from "./functions/fetchStats";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import HomePage from "./components/HomePage";
import NewsPanelPage from "./components/NewsPanelPage";
import ContactPage from "./components/ContactPage";
import NotFoundPage from "./components/NotFoundPage";
import AppBarComponent from "./components/AppBarComponent";
import useStyles from "./components/useStyles.jsx";

const App = () => {
  const classes = useStyles();

  //declare states:
  const [chartIsLoading, setChartIsLoading] = useState(false);
  const [chartUrl, setChartUrl] = useState(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //!!
  const [pageNumber, setPageNumber] = useState(1);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isShowingFetch, setIsShowingFetch] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [messageObject, setMessageObject] = useState(null);
  const [newsDetails, setNewsDetails] = useState(null);
  const [detailsId, setDetailsId] = useState(null);

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
  //it is easy to pass the "_" down the tree to all components and functions
  //so we do not need useContext which results in an easier code
  // and unlike useContext, this method is applicable to functions too
  const _ = {};
  _.chartIsLoading = chartIsLoading;
  _.setChartIsLoading = setChartIsLoading;
  _.chartUrl = chartUrl;
  _.setChartUrl = setChartUrl;
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
  //end of state declaration

  // useEffect are here:
  useEffect(() => {
    fetchStats(_); //fetch the statistics for homePage chart
  }, []);

  useEffect(() => {
    fetchBecauseParamsChanged(_);
  }, [fetchParams]);

  useEffect(() => {
    fetchBecausePageChanged(_);
  }, [pageNumber]);

  useEffect(() => {
    fetchBecauseDetailsIdChanged(_);
  }, [detailsId]);
  //end of useEffects

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <AppBarComponent />
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
