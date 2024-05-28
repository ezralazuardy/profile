import config from "@/lib/config.json" assert { type: "json" };
import { DateTime } from "luxon";

export function debounce(callback: Function, delay: number) {
  let timer: any;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function icon(svg: string, className: string = ""): string {
  if (className === "") className = "w-4 h-4";
  return `<span class="${className}">${svg}</span>`;
}

export function now(format: string = "HH:mm"): string {
  const now = DateTime.now();
  const utc = now.setZone(config.timezone || "UTC");

  return utc.toFormat(format);
}
