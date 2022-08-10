//handle the message when submit button on the contact form is clicked
export const handleMessage = (e, _) => {
  e.preventDefault();

  _.setIsMessageSent(true);

  _.setMessageObject({
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    body: document.getElementById("messageBody").value,
  });
};
