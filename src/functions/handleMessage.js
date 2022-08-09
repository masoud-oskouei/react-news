import { state, setState } from "../functions/constants";

export const handleMessage = (inputMessageData, _) => {
  _.setIsMessageSent(true);
  console.log(inputMessageData);
  _.setMessageObject(inputMessageData);
};
