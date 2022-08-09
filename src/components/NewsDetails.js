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

  return (
    <div>
      {console.log("props._.isModalOpen[state]=", props._.isModalOpen)}
      <Modal
        open={props._.isModalOpen}
        onClose={() => {
          props._.setIsModalOpen(false);
          props._.setIsDetailsLoading(true);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {props._.isDetailsLoading && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Is loading ... <CircularProgress />
            </Typography>
          )}
          {console.log("modal: props.newsDetails=", props._.newsDetails)}
          {console.log(
            "modal: props.isDetailsLoading =",
            props._.isDetailsLoading
          )}
          {!props._.newsDetails && !props._.isDetailsLoading && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Click an item please...
            </Typography>
          )}
          {props._.newsDetails && !props._.isDetailsLoading && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h2>
                <a href={props._.newsDetails.url}>
                  {props._.newsDetails.title}
                </a>
              </h2>
              <br />
              ID: {params.newsId}
              <br /> created at: &nbsp;
              {props._.newsDetails.created_at.slice(0, 19)}
              <br />
              <address>by: {props._.newsDetails.author}</address>
              <br />
              <br />
              <b>COMMENTS</b>
              {props._.newsDetails.children &&
                props._.newsDetails.children.map((comment, index) => {
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
