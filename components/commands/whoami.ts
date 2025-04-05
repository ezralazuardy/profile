const whoamiObj = {
  message: [
    [
      "Mirror shows a face, but not the core",
      "A soul adrift in life's endless maze",
      "The question evermore - ",
    ],
    [
      "Layers of self, a puzzle to unfold",
      "Memories whisper, dreams yet to ignite",
      "This mystery, forever untold - ",
    ],
    [
      "Flickering flame, defying the dark's hold",
      "Yearning for purpose, a story yet penned",
      "This secret waits to unfold - ",
    ],
    [
      "Binary whispers, a digital plea",
      "Lost in the code, a soul seeking flight",
      "A question in the machine's night - ",
    ],
    [
      "Binary whispers, a digital plea",
      "Lost in the code, the soul seeking flight",
      "Yet, a question remains in the machine's night - ",
    ],
    [
      "Amidst whispers of stars, a path I chase",
      "Self-discovery, a relentless pace",
      "The echo never ends its race - ",
    ],
    ["In the kaleidoscope of existence,", "I am but a reflection questioning the enigma - "],
    [
      "Amidst cosmic whispers,",
      "I navigate the maze of self-discovery,",
      "Echoing the eternal refrain - ",
    ],
    [
      "In the symphony of life,",
      "I am a note inquiring its own melody,",
      "Harmonizing with the universal query - ",
    ],
    ["As stardust contemplating its journey,", "I ponder the cosmic query,", "Silently asking - "],
    [
      "In the tapestry of reality,",
      "I am the thread of self-inquiry,",
      "Weaving through the eternal question - ",
    ],
  ],
};

export const createWhoami = (): string[] => {
  const whoami: string[] = [];
  const r = Math.floor(Math.random() * whoamiObj.message.length);

  whoami.push("<br/>");
  whoamiObj.message[r].forEach((ele, idx) => {
    if (idx === whoamiObj.message[r].length - 1) {
      ele += "<span class='banner'>Who Am I?</span>";
    }
    whoami.push(ele);
  });
  whoami.push("<br/>");

  return whoami;
};
