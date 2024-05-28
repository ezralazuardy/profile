import config from "@/lib/config.json" assert { type: "json" };

const createBanner = (): string[] => {
  const banner: string[] = [];
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
  banner.push("Welcome to Ezra's personal space.");
  banner.push(
    "Type <span class='command'>'help'</span> for a list of all available commands.",
  );
  banner.push(
    `Type <span class='command'>'repo'</span> to view the GitHub repository or click <a href='${config.repoLink}' target='_blank'>here</a>.`,
  );
  banner.push("<br/>");
  return banner;
};

export const BANNER = createBanner();
