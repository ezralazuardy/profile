import config from "@/lib/config.json" assert { type: "json" };

const createAchievement = (): string[] => {
  const achievements: string[] = [];
  const files = `${config.achievements.length} File(s)`;
  const SPACE = "&nbsp;";
  let string = "";

  achievements.push("<br/>");
  config.achievements.forEach((ele) => {
    let link = `<a href="${ele[2]}" target="_blank">${ele[0]}</a>`;
    string += link;
    string += SPACE.repeat(10 - ele[0].length);
    string += "<br/>";
    string += ele[1];
    achievements.push(string);
    achievements.push("<br/>");
    string = "";
  });
  achievements.push(files);
  achievements.push("<br/>");
  return achievements;
};

export const ACHIEVEMENTS = createAchievement();
