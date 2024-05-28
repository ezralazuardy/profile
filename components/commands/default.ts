const createDefault = (): string[] => {
  const defaultMsg: string[] = [];
  const defaultMsgArr = [
    "<br/>",
    "COMMAND NOT FOUND",
    "Type <span class='command'>'help'</span> to get started.",
    "<br/>",
  ];

  defaultMsgArr.forEach((ele) => {
    defaultMsg.push(ele);
  });

  return defaultMsg;
};

export const DEFAULT = createDefault();
