import config from "@/lib/config.json" assert { type: "json" };

const createAbout = (): string[] => {
  const about: string[] = [];
  const NAME = config.title;
  const SPACE = "&nbsp;";
  const EMAIL = "Email";
  const GITHUB = "Github";
  const LINKEDIN = "Linkedin";

  about.push("<br/>");
  about.push(`I'm ${NAME}.`);
  about.push("<br/>");
  about.push("An egocentric; polyglot software engineer,");
  about.push("that speak in kotlin, php, ts, py, go, and rust.");
  about.push("<br/>");

  let string = "";
  string += `<div class="flex me-2">${logo(email)}`;
  string += SPACE.repeat(1);
  string += EMAIL;
  string += SPACE.repeat(18 - EMAIL.length);
  string += `<a target='_blank' href='mailto:${config.social.email}'>${config.social.email}</a></div>`;
  about.push(string);

  string = "";
  string += `<div class="flex me-2">${logo(github)}`;
  string += SPACE.repeat(1);
  string += GITHUB;
  string += SPACE.repeat(18 - GITHUB.length);
  string += `<a target='_blank' href='https://github.com/${config.social.github}'>github/${config.social.github}</a>`;
  about.push(string);

  string = "";
  string += `<div class="flex me-2">${logo(linkedin)}`;
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

function logo(svg: string): string {
  return `<span class="pt-1">${svg}</span>`;
}

const email = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;

const github = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

const linkedin = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;

export const ABOUT = createAbout();
