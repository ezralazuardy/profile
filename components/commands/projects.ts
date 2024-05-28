import config from "@/lib/config.json" assert { type: "json" };

const createProject = (): string[] => {
  const projects: string[] = [];
  const files = `${config.projects.length} File(s)`;
  let string = "";

  projects.push("<br/>");
  config.projects.forEach((ele) => {
    let link = `<a href="${ele[2]}" target="_blank">${ele[0]}</a>`;
    string += link;
    string += "<br/>";
    string += ele[1];
    projects.push(string);
    projects.push("<br/>");
    string = "";
  });
  projects.push(files);
  projects.push("<br/>");
  return projects;
};

export const PROJECTS = createProject();
