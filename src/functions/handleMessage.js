export const handleMessage = (
  inputMessageData,
  setIsMessageSent,
  setMessageObject
) => {
  // let mt = {
  //   name: e.target.name.value,
  //   email: e.target.email.value,
  //   body: e.target.body.value,
  // };
  setIsMessageSent(true);
  console.log(inputMessageData);
  setMessageObject(inputMessageData);
};
