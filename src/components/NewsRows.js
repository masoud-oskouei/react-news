import { sortFunctions } from "../functions/sortFunctions";
import { Link } from "react-router-dom";
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
    props.showState.activeList === "faves" ? props.favesList : props.newsList;
  return (
    <>
      <div remind="new">
        {props.isListLoading && (
          <div>
            List is Loading . . . <CircularProgress />{" "}
          </div>
        )}
        {!props.isListLoading && list.length === 0 && (
          <div>Nothing found! </div>
        )}
        {!props.isListLoading && (
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
                      .includes(props.filterParams.filterTerm.toLowerCase())) ||
                  (newsItem.description &&
                    newsItem.description
                      .toLowerCase()
                      .includes(props.filterParams.filterTerm)) ||
                  (newsItem.title &&
                    newsItem.title
                      .toLowerCase()
                      .includes(props.filterParams.filterTerm))
                );
              })

              .sort((a, b) => {
                let compareFunc = sortFunctions[props.filterParams.sortBy]
                  ? sortFunctions[props.filterParams.sortBy]
                  : sortFunctions.default;
                return compareFunc(
                  a[props.filterParams.sortBy]
                    ? a[props.filterParams.sortBy]
                    : "",
                  b[props.filterParams.sortBy]
                    ? b[props.filterParams.sortBy]
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
                        <Link to={newsItem.objectID}>{newsItem.title}</Link>
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
                              onClick={() =>
                                props.favesHandler(
                                  newsItem,
                                  props.favesList,
                                  props.setFavesList
                                )
                              }
                            >
                              {props.favesList.includes(newsItem) ? "-" : "+"}{" "}
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

            {/* <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" /> */}
          </List>
        )}
      </div>
      {/* ////////////////// */}
      {/* ////////////////// */}
      {/* ////////////////// */}
      {/* ////////////////// */}
    </>
  );
};
export default NewsRows;
