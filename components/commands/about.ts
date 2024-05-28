import config from "@/lib/config.json" assert { type: "json" };
import { email, github, linkedin } from "@/lib/icons";
import { icon } from "@/lib/utils";

const createAbout = (): string[] => {
  const about: string[] = [];
  const SPACE = "&nbsp;";
  const EMAIL = "Email";
  const GITHUB = "GitHub";
  const LINKEDIN = "LinkedIn";

  about.push("<br/>");
  about.push(`I'm ${config.title}.`);
  about.push("<br/>");
  about.push("An egocentric; polyglot software engineer,");
  about.push("that speak in kotlin, php, ts, py, go, and rust.");
  about.push("<br/>");

  let string = "";
  string += `<div class="flex me-2">${icon(email)}`;
  string += SPACE.repeat(1);
  string += EMAIL;
  string += SPACE.repeat(18 - EMAIL.length);
  string += `<a target='_blank' href='mailto:${config.social.email}'>${config.social.email}</a></div>`;
  about.push(string);

  string = "";
  string += `<div class="flex me-2">${icon(github)}`;
  string += SPACE.repeat(1);
  string += GITHUB;
  string += SPACE.repeat(18 - GITHUB.length);
  string += `<a target='_blank' href='https://github.com/${config.social.github}'>github/${config.social.github}</a>`;
  about.push(string);

  string = "";
  string += `<div class="flex me-2">${icon(linkedin)}`;
  string += SPACE.repeat(1);
  string += LINKEDIN;
  string += SPACE.repeat(18 - LINKEDIN.length);
  string += `<a target='_blank' href='https://www.linkedin.com/in/${config.social.linkedin}'>linkedin/${config.social.linkedin}</a>`;
  about.push(string);

  about.push("<br/>");
  about.push(
    "Find more about me on <a target='_blank' href='https://about.lazuardy.tech'>Linktree</a>.",
  );
  about.push("<br/>");
  return about;
};

export const ABOUT = createAbout();
