import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { favesHandler } from "../functions/favesHandler";
//import * as React from "react";

const NewsRowComponent = (props) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt=""
            src={props.newsItem.urlToImage}
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
                  if (props.newsItem.objectID == props._.detailsId) {
                    props._.setIsModalOpen(true);
                    props._.setIsDetailsLoading(false);
                  }
                  props._.setDetailsId(props.newsItem.objectID);
                }}
              >
                {props.newsItem.title}
              </h3>
            </a>
          }
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <button
                  onClick={() => {
                    favesHandler(props.newsItem, props._);
                  }}
                >
                  {props._.favesList.includes(props.newsItem) ? "-" : "+"} Fav
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;by {props.newsItem.author}
              </Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;at {props.newsItem.created_at}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
export default NewsRowComponent;
