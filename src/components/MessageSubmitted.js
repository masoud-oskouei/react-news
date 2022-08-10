//  Inside the Contact page, after the message is submitted, this component is shown
import { Button } from "@mui/material";
const MessageSubmitted = (props) => {
  return (
    <div>
      <h3>
        Your message was converted into a JSON object. we can not sent it now.
        In the next version it will become stringified and posted to backend.
        Below is that JSON object:
        {/* make the JSON object more human readable*/}
        <p>{JSON.stringify(props._.messageObject).replace(/"/g, "")}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props._.setIsMessageSent(false)}
        >
          {" "}
          Compose another message
        </Button>
      </h3>
    </div>
  );
};
export default MessageSubmitted;
