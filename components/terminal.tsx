"use client";

import config from "@/lib/config.json" assert { type: "json" };
import { useRef, useEffect, RefObject } from "react";
import { HELP } from "@/components/commands/help";
import { BANNER } from "@/components/commands/banner";
import { ABOUT } from "@/components/commands/about";
import { DEFAULT } from "@/components/commands/default";
import { ACHIEVEMENTS } from "@/components/commands/achievements";
import { PROJECTS } from "@/components/commands/projects";
import { createWhoami } from "@/components/commands/whoami";
import { debounce } from "@/lib/utils";

export default function Terminal() {
  const bottomContainer: RefObject<HTMLDivElement> = useRef(null);
  const terminal: RefObject<HTMLDivElement> = useRef(null);
  const host: RefObject<HTMLSpanElement> = useRef(null);
  const user: RefObject<HTMLSpanElement> = useRef(null);
  const prompt: RefObject<HTMLSpanElement> = useRef(null);
  const mutWriteLines: RefObject<HTMLAnchorElement> = useRef(null);
  const mutUserInput: RefObject<HTMLInputElement> = useRef(null);
  const HISTORY: string[] = [];
  const COMMANDS = [
    "help",
    "whoami",
    "about",
    "projects",
    "achievements",
    "articles",
    "resume",
    "repo",
    "banner",
    "clear",
  ];

  const resetInput = "";
  let tempInput = "";
  let userInput = "";
  let historyIdx = 0;

  const debouncedEnterKey = debounce(enterKey, 50);

  function enterKey() {
    if (!mutWriteLines?.current) return;
    if (!mutUserInput?.current) return;
    if (!prompt?.current) return;

    userInput = mutUserInput.current.value;
    HISTORY.push(userInput);
    historyIdx = HISTORY.length;

    if (userInput === "clear") {
      commandHandler(userInput.toLowerCase().trim());
      mutUserInput.current.value = resetInput;
      userInput = resetInput;
      return;
    }

    if (mutWriteLines.current.parentNode) {
      const div = document.createElement("div");
      div.innerHTML = `
        <span id="prompt">
          <span id="user">${config.username}</span>@<span id="host">${config.hostname}</span>:$ ~
        </span>
        <span class='output'>${userInput}</span>
      `;
      mutWriteLines.current.parentNode.insertBefore(div, mutWriteLines.current);
    }

    if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
    }

    mutUserInput.current.value = resetInput;
    userInput = resetInput;
  }

  function tabKey() {
    if (!mutUserInput?.current) return;
    let currInput = mutUserInput.current.value;
    for (const command of COMMANDS) {
      if (command.startsWith(currInput)) {
        mutUserInput.current.value = command;
        return;
      }
    }
  }

  function arrowKeys(e: string) {
    if (!mutUserInput?.current) return;
    switch (e) {
      case "ArrowDown":
        if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          mutUserInput.current.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length)
            mutUserInput.current.value = tempInput;
        }
        break;
      case "ArrowUp":
        if (historyIdx === HISTORY.length)
          tempInput = mutUserInput.current.value;
        if (historyIdx !== 0) {
          historyIdx -= 1;
          mutUserInput.current.value = HISTORY[historyIdx];
        }
        break;
    }
  }

  function scrollToBottom() {
    if (!bottomContainer?.current) return;
    bottomContainer.current.scrollIntoView({ behavior: "smooth" });
  }

  function userInputHandler(e: KeyboardEvent) {
    const key = e.key;
    switch (key) {
      case "Enter":
        e.preventDefault();
        debouncedEnterKey();
        scrollToBottom();
        break;
      case "Escape":
        if (!mutUserInput?.current) return;
        mutUserInput.current.value = "";
        break;
      case "ArrowUp":
        arrowKeys(key);
        break;
      case "ArrowDown":
        arrowKeys(key);
        break;
      case "Tab":
        e.preventDefault();
        tabKey();
        break;
    }
  }

  function commandHandler(input: string) {
    switch (input) {
      case "help":
        writeLines(HELP);
        break;
      case "whoami":
        writeLines(createWhoami());
        break;
      case "about":
        writeLines(ABOUT);
        break;
      case "projects":
        writeLines(PROJECTS);
        break;
      case "achievements":
        writeLines(ACHIEVEMENTS);
        break;
      case "articles":
        writeLines(["<br/>", "Redirecting to Medium...", "<br/>"]);
        setTimeout(() => {
          window.open(config.resumeLink, "_blank");
        }, 1000);
        break;
      case "resume":
        writeLines(["<br/>", "Redirecting to Papermark...", "<br/>"]);
        setTimeout(() => {
          window.open(config.resumeLink, "_blank");
        }, 1000);
        break;
      case "repo":
        writeLines(["<br/>", "Redirecting to GitHub...", "<br/>"]);
        setTimeout(() => {
          window.open(config.repoLink, "_blank");
        }, 1000);
        break;
      case "banner":
        writeLines(["<br/>"]);
        writeLines(BANNER);
        break;
      case "clear":
        setTimeout(() => {
          if (!terminal?.current) return;
          if (!mutWriteLines?.current) return;
          terminal.current.innerHTML = "";
          terminal.current.appendChild(mutWriteLines.current);
          writeLines(BANNER);
        });
        break;
      default:
        writeLines(DEFAULT);
        break;
    }
  }

  function writeLines(message: string[]) {
    message.forEach((item, idx) => {
      displayText(item, idx);
    });
  }

  function displayText(item: string, idx: number) {
    setTimeout(() => {
      if (!mutWriteLines?.current) return;
      const p = document.createElement("p");
      p.innerHTML = item;
      mutWriteLines.current.parentNode!.insertBefore(p, mutWriteLines.current);
      scrollToBottom();
    }, idx);
  }

  function boot() {
    commandHandler("clear");
    tempInput = "";
    userInput = "";
    historyIdx = 0;
    if (host?.current) host.current.innerText = config.hostname;
    if (user?.current) user.current.innerText = config.username;
    if (mutUserInput?.current) {
      mutUserInput.current.focus();
      mutUserInput.current.addEventListener("keypress", userInputHandler);
      mutUserInput.current.addEventListener("keydown", userInputHandler);
      window.addEventListener("click", () => {
        if (mutUserInput?.current) mutUserInput.current.focus();
      });
    }
  }

  useEffect(() => {
    setTerminalStyle();
    boot();
  });

  return (
    <>
      <div className="flex justify-center items-center min-h-screen pb-8 lg:pb-16">
        <div className="w-62 md:w-auto">
          <div ref={terminal} id="terminal" className="min-w-62 w-full">
            <a ref={mutWriteLines} id="write-lines" className="w-full"></a>
          </div>
          <div className="w-full flex flex-wrap space-x-2">
            <div className="w-auto">
              <span ref={prompt} id="prompt">
                <span ref={user} id="user"></span>@
                <span ref={host} id="host"></span>:$ ~{" "}
              </span>
            </div>
            <div className="w-auto flex-grow">
              <input
                ref={mutUserInput}
                id="user-input"
                type="text"
                className="w-full"
                enterKeyHint="enter"
                autoCapitalize="none"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={bottomContainer} className="invisible w-4 h-4 pt-0.5"></div>
    </>
  );
}

export function setTerminalStyle() {
  if (!document) return;

  const style = document.createElement("style");
  const head = document.head;
  const background = `body {background: ${config.colors.background}}`;
  const foreground = `body {color: ${config.colors.foreground}}`;
  const inputBackground = `input {background: ${config.colors.background}}`;
  const inputForeground = `input {color: ${config.colors.prompt.input}}`;
  const outputColor = `.output {color: ${config.colors.prompt.input}}`;
  const preHost = `#pre-host {color: ${config.colors.prompt.host}}`;
  const host = `#host {color: ${config.colors.prompt.host}}`;
  const preUser = `#pre-user {color: ${config.colors.prompt.user}}`;
  const user = `#user {color: ${config.colors.prompt.user}}`;
  const prompt = `#prompt {color: ${config.colors.prompt.default}}`;
  const banner = `pre, .banner {color: ${config.colors.banner}}`;
  const link = `a {color: ${config.colors.link.text}}`;
  const linkHighlight = `a:hover {background: ${config.colors.link.highlightColor}}`;
  const linkTextHighlight = `a:hover {color: ${config.colors.link.highlightText}}`;
  const commandHighlight = `.command {color: ${config.colors.commands.textColor}}`;
  const keys = `.keys {color: ${config.colors.banner}}`;

  head.appendChild(style);

  if (!style.sheet) return;

  style.sheet.insertRule(background);
  style.sheet.insertRule(foreground);
  style.sheet.insertRule(inputBackground);
  style.sheet.insertRule(inputForeground);
  style.sheet.insertRule(outputColor);
  style.sheet.insertRule(preHost);
  style.sheet.insertRule(host);
  style.sheet.insertRule(preUser);
  style.sheet.insertRule(user);
  style.sheet.insertRule(prompt);
  style.sheet.insertRule(banner);
  style.sheet.insertRule(link);
  style.sheet.insertRule(linkHighlight);
  style.sheet.insertRule(linkTextHighlight);
  style.sheet.insertRule(commandHighlight);
  style.sheet.insertRule(keys);
}
