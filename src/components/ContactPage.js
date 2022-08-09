import MessageForm from "./MessageForm.js";
import MessageSubmitted from "./MessageSubmitted.js";
import useStyles from "./useStyles.jsx";
const ContactPage = (props) => {
  const classes = useStyles();
  return (
    <div>
      <h2>Contact Page</h2>
      {!props._.isMessageSent && <MessageForm _={props._} />}
      {props._.isMessageSent && <MessageSubmitted _={props._} />}
    </div>
  );
};
export default ContactPage;
