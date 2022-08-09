import { sortFunctions } from "../functions/sortFunctions";
import { favesHandler } from "../functions/favesHandler";
import { CircularProgress } from "@mui/material";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
const NewsRows = (props) => {
  let list =
    props._.showState.activeList === "faves"
      ? props._.favesList
      : props._.newsList;
  return (
    <>
      <div remind="new">
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
              //maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {list
              .filter((newsItem, index) => {
                return (
                  (newsItem.content &&
                    newsItem.content
                      .toLowerCase()
                      .includes(
                        props._.filterParams.filterTerm.toLowerCase()
                      )) ||
                  (newsItem.description &&
                    newsItem.description
                      .toLowerCase()
                      .includes(props._.filterParams.filterTerm)) ||
                  (newsItem.title &&
                    newsItem.title
                      .toLowerCase()
                      .includes(props._.filterParams.filterTerm))
                );
              })

              .sort((a, b) => {
                let compareFunc = sortFunctions[props._.filterParams.sortBy]
                  ? sortFunctions[props._.filterParams.sortBy]
                  : sortFunctions.default;
                return compareFunc(
                  a[props._.filterParams.sortBy]
                    ? a[props._.filterParams.sortBy]
                    : "",
                  b[props._.filterParams.sortBy]
                    ? b[props._.filterParams.sortBy]
                    : ""
                );
              })

              .map((newsItem, index) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt=""
                        src={newsItem.urlToImage}
                        sx={{ width: "6em", height: "4em" }}
                        variant="square"
                        style={{ marginRight: "1em" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <a href="-" onClick={(e) => e.preventDefault()}>
                          <h3
                            onClick={() => {
                              if (newsItem.objectID == props._.detailsId) {
                                props._.setIsModalOpen(true);
                                props._.setIsDetailsLoading(false);
                              }
                              props._.setDetailsId(newsItem.objectID);
                            }}
                          >
                            {newsItem.title}
                          </h3>
                        </a>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <button
                              onClick={() => {
                                favesHandler(newsItem, props._);
                              }}
                            >
                              {props._.favesList.includes(newsItem) ? "-" : "+"}{" "}
                              Fav
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;by {newsItem.author}
                          </Typography>
                          &nbsp;&nbsp;&nbsp;&nbsp;at {newsItem.created_at}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
          </List>
        )}
      </div>
    </>
  );
};
export default NewsRows;
