import { state, setState } from "../functions/constants";

export const handleMessage = (e, _) => {
  e.preventDefault();

  _.setIsMessageSent(true);
  console.log({
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    body: document.getElementById("messageBody").value,
  });
  _.setMessageObject({
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    body: document.getElementById("messageBody").value,
  });
};
