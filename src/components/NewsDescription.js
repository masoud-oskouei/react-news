import { Typography, Modal, Box, CircularProgress } from "@mui/material";

const NewsDescription = (props) => {
  return (
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <h2>
        <a href={props._.newsDetails.url}>{props._.newsDetails.title}</a>
      </h2>
      <br />
      ID: {props._.newsDetails.id}
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
  );
};

export default NewsDescription;
