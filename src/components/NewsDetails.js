import { Typography, Modal, Box, CircularProgress } from "@mui/material";
import { handleModalClose } from "../functions/handleModalClose.js";
import NewsDescription from "./NewsDescription.js";
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
    p: 4,
  };
  return (
    <div>
      <Modal
        open={props._.isModalOpen}
        onClose={(e) => handleModalClose(e, props._)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {props._.isDetailsLoading && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Is loading ... <CircularProgress />
            </Typography>
          )}

          {!props._.newsDetails && !props._.isDetailsLoading && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Click an item please...
            </Typography>
          )}
          {props._.newsDetails && !props._.isDetailsLoading && (
            <NewsDescription _={props._}></NewsDescription>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default NewsDetails;
