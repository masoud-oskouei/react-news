import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Typography,
  Grid,
  Modal,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import useStyles from "./useStyles.jsx";

const NewsDetails = (props) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (props.routedFrom === ":newsId") {
      props.setIsModalOpen(true);
    }
    console.log(
      "before If params.newsId == props.detailsId...",
      params.newsId == props.detailsId
    );
    console.log("params.newsId", params.newsId);
    console.log("props.detailsId", props.detailsId);
    //console.log("params.newsId",typeof(params.newsId))
    //console.log("params.newsId",typeof(params.newsId))
    if (params.newsId == props.detailsId) {
      props.setIsDetailsLoading(false);
    }
    props.setDetailsId(params.newsId);
  }, [location]);
  return (
    <div>
      {console.log("props.isModalOpen=", props.isModalOpen)}
      <Modal
        open={props.isModalOpen}
        onClose={() => {
          props.setIsModalOpen(false);
          props.setIsDetailsLoading(true);
          window.history.back();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {props.isDetailsLoading && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Is loading ... <CircularProgress />
            </Typography>
          )}
          {console.log("modal: props.newsDetails=", props.newsDetails)}
          {console.log(
            "modal: props.isDetailsLoading =",
            props.isDetailsLoading
          )}
          {!props.newsDetails && !props.isDetailsLoading && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Click an item please...
            </Typography>
          )}
          {props.newsDetails && !props.isDetailsLoading && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h2>
                <a href={props.newsDetails.url}>{props.newsDetails.title}</a>
              </h2>
              <br />
              ID: {params.newsId}
              <br /> created at: &nbsp;
              {props.newsDetails.created_at.slice(0, 19)}
              <br />
              <address>by: {props.newsDetails.author}</address>
              <br />
              <br />
              <b>COMMENTS</b>
              {props.newsDetails.children &&
                props.newsDetails.children.map((comment, index) => {
                  return (
                    <div className="row" key={index}>
                      <p>
                        {index + 1}- By <b>{comment.author}</b> at{" "}
                        {comment.created_at.slice(0, 19)}
                        {
                          <span
                            dangerouslySetInnerHTML={{
                              __html: comment.text,
                            }}
                          ></span>
                        }
                      </p>
                      <hr />
                    </div>
                  );
                })}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default NewsDetails;
