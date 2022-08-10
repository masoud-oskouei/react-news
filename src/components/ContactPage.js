//the page that has the contact form
import MessageForm from "./MessageForm.js";
import MessageSubmitted from "./MessageSubmitted.js";
const ContactPage = (props) => {
  return (
    <div>
      <h2>Contact Page</h2>
      {!props._.isMessageSent && <MessageForm _={props._} />}
      {props._.isMessageSent && <MessageSubmitted _={props._} />}
    </div>
  );
};
export default ContactPage;
