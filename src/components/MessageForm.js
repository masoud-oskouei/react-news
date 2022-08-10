// This is the form that is inside the contactPge. It received the data from the user.
import { Button, TextField } from "@mui/material";
import { handleMessage } from "../functions/handleMessage.js";
import useStyles from "./useStyles.jsx";

const MessageForm = (props) => {
  const classes = useStyles();

  return (
    <form id="contactForm">
      <TextField id="name" label="Name" variant="outlined" size="small" />{" "}
      <TextField id="email" label="Email" variant="outlined" size="small" />
      <br></br>
      <br></br>
      <TextField
        className={classes.messageTextField}
        id="messageBody"
        label="Your Message"
        multiline
        rows={4}
        fullWidth
      />
      <br></br>
      <br></br>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => handleMessage(e, props._)}
      >
        {" "}
        Submit
      </Button>
    </form>
  );
};
export default MessageForm;
