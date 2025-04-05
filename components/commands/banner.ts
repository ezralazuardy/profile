import config from "@/lib/config.json";
import { location, time } from "@/lib/icons";
import { icon, now } from "@/lib/utils";

const createBanner = (): string[] => {
  const banner: string[] = [];

  banner.push(
    `<div class="flex space-x-2 text-sm">${icon(location, "pt-1 w-3.5 h-3.5")}<span>${config.location}</span></div>`
  );
  banner.push(
    `<div class="flex space-x-2 text-sm mb-2">${icon(time, "pt-1 w-3.5 h-3.5")}<span>${now()} (${config.timezone})</span></div>`
  );

  config.ascii.forEach((item) => {
    let bannerString = "";
    for (let i = 0; i < item.length; i++) {
      if (item[i] === " ") {
        bannerString += "&nbsp;";
      } else {
        bannerString += item[i];
      }
    }
    let eleToPush = `<pre>${bannerString}</pre>`;
    banner.push(eleToPush);
  });
  banner.push("Welcome to my personal space.");
  banner.push("Type <span class='command'>'help'</span> for a list of all available commands.");
  banner.push(
    `Type <span class='command'>'repo'</span> to see my repository or directly go to <a href='${config.githubLink}' target='_blank' class='font-bold underline'>GitHub</a>.`
  );
  banner.push("<br/>");

  return banner;
};

export const BANNER = createBanner();
