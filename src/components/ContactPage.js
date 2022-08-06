import useStyles from "./useStyles.jsx";

import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  TextField,
} from "@mui/material";
const ContactPage = (props) => {
  const classes = useStyles();
  return (
    <div>
      <h2>Contact Page</h2>
      {!props.isMessageSent && (
        <form id="contactForm">
          <TextField id="name" label="Name" variant="outlined" size="small" />{" "}
          <TextField id="email" label="Email" variant="outlined" size="small" />
          <br></br>
          <br></br>
          <div></div>
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
            onClick={(e) => {
              e.preventDefault();
              const inputMessageData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                body: "body",
              };
              props.handleMessage(
                inputMessageData,
                props.setIsMessageSent,
                props.setMessageObject
              );
            }}
          >
            {" "}
            Submit
          </Button>
        </form>
      )}
      {props.isMessageSent && (
        <div>
          <h3>
            Your message was converted into a JSON object. we can not sent it
            now. In the next version it will become stringified and posted to
            backend. Below is that JSON object:
            <p>{JSON.stringify(props.messageObject).replace(/"/g, "")}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.setIsMessageSent(false)}
            >
              {" "}
              Compose another message
            </Button>
          </h3>
        </div>
      )}
    </div>
  );
};
export default ContactPage;
