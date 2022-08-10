// The list of rows of news items
import { CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import NewsRowComponent from "./NewsRowComponent.js";
import { sortAndFilter } from "../functions/sortAndFilter";
const NewsRows = (props) => {
  let list =
    props._.showState.activeList === "faves"
      ? props._.favesList
      : props._.newsList;
  list = sortAndFilter(list, props._);
  return (
    <>
      <div remind="new">
        {/* "Loading" animated component */}
        {props._.isListLoading && (
          <div>
            List is Loading . . . <CircularProgress />{" "}
          </div>
        )}

        {!props._.isListLoading && list.length === 0 && (
          <div>Nothing found! </div>
        )}
        {!props._.isListLoading && (
          <List
            sx={{
              width: "90%",
              bgcolor: "background.paper",
            }}
          >
            {list.map((newsItem, index) => (
              <NewsRowComponent key={index} newsItem={newsItem} _={props._} />
            ))}
          </List>
        )}
      </div>
    </>
  );
};
export default NewsRows;
