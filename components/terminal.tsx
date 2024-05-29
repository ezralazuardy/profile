"use client";

import config from "@/lib/config.json" assert { type: "json" };
import { useRef, useEffect, useState, RefObject } from "react";
import { HELP } from "@/components/commands/help";
import { BANNER } from "@/components/commands/banner";
import { ABOUT } from "@/components/commands/about";
import { DEFAULT } from "@/components/commands/default";
import { ACHIEVEMENTS } from "@/components/commands/achievements";
import { PROJECTS } from "@/components/commands/projects";
import { createWhoami } from "@/components/commands/whoami";

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

export default function Terminal() {
  const HISTORY: string[] = [];
  const command: RefObject<HTMLDivElement> = useRef(null);
  const terminal: RefObject<HTMLDivElement> = useRef(null);
  const host: RefObject<HTMLSpanElement> = useRef(null);
  const user: RefObject<HTMLSpanElement> = useRef(null);
  const prompt: RefObject<HTMLSpanElement> = useRef(null);
  const mutWriteLines: RefObject<HTMLAnchorElement> = useRef(null);
  const mutUserInput: RefObject<HTMLInputElement> = useRef(null);

  const resetInput = "";
  let tempInput = "";
  let userInput = "";
  let historyIdx = 0;
  let beepKey: HTMLAudioElement | null = null;
  let beepCommand: HTMLAudioElement | null = null;

  async function enterKey() {
    if (!mutWriteLines?.current) return;
    if (!mutUserInput?.current) return;
    if (!prompt?.current) return;

    userInput = mutUserInput.current.value;
    HISTORY.push(userInput);
    historyIdx = HISTORY.length;

    if (userInput === "clear") {
      await commandHandler(userInput.toLowerCase().trim());
      mutUserInput.current.value = resetInput;
      userInput = resetInput;
      return;
    }

    if (mutWriteLines.current.parentNode) {
      const p = document.createElement("p");
      p.innerHTML = `
          <span id="prompt">
            <span id="user">${config.username}</span>@<span id="host">${config.hostname}</span>:$ ~
          </span>
          <span class='output'>${userInput}</span>
        `;
      mutWriteLines.current.parentNode.insertBefore(p, mutWriteLines.current);
    }

    if (userInput.trim().length !== 0) {
      await commandHandler(userInput.toLowerCase().trim());
    }

    mutUserInput.current.value = resetInput;
    userInput = resetInput;
  }

  async function tabKey() {
    if (!mutUserInput?.current) return;
    let currInput = mutUserInput.current.value;
    for (const command of COMMANDS) {
      if (command.startsWith(currInput)) {
        mutUserInput.current.value = command;
        return;
      }
    }
  }

  async function arrowKeys(e: string) {
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

  async function scrollToBottom() {
    command?.current?.scrollIntoView();
  }

  async function writeLines(message: string[], animate: boolean = true) {
    let delay = 0;
    if (mutUserInput.current) mutUserInput.current.disabled = true;
    for (let i = 0; i < message.length; i++) {
      displayText(message[i], animate ? (delay += 120) : 0);
    }
    setTimeout(() => {
      if (mutUserInput.current) mutUserInput.current.disabled = false;
    }, delay);
  }

  async function displayText(item: string, delay: number) {
    return new Promise((resolve) =>
      setTimeout(async () => {
        if (!mutWriteLines?.current) return;
        const p = document.createElement("p");
        p.innerHTML = item;
        mutWriteLines.current.parentNode!.insertBefore(
          p,
          mutWriteLines.current,
        );
        await scrollToBottom();
        resolve(true);
      }, delay),
    );
  }

  async function commandHandler(input: string) {
    return new Promise((resolve) =>
      setTimeout(async () => {
        switch (input) {
          case "help":
            beepCommand?.play().then(async () => {
              await writeLines(HELP);
            });
            break;
          case "whoami":
            beepCommand?.play().then(async () => {
              await writeLines(createWhoami());
            });
            break;
          case "about":
            beepCommand?.play().then(async () => {
              await writeLines(ABOUT);
            });
            break;
          case "projects":
            beepCommand?.play().then(async () => {
              await writeLines(PROJECTS);
            });
            break;
          case "achievements":
            beepCommand?.play().then(async () => {
              await writeLines(ACHIEVEMENTS);
            });
            break;
          case "articles":
            beepCommand?.play().then(async () => {
              await writeLines(["<br/>", "Redirecting to Medium...", "<br/>"]);
              setTimeout(() => {
                window.open(config.articleLink, "_blank");
              }, 1000);
            });
            break;
          case "resume":
            beepCommand?.play().then(async () => {
              await writeLines([
                "<br/>",
                "Redirecting to Papermark...",
                "<br/>",
              ]);
              setTimeout(() => {
                window.open(config.resumeLink, "_blank");
              }, 1000);
            });
            break;
          case "repo":
            beepCommand?.play().then(async () => {
              await writeLines(["<br/>", "Redirecting to GitHub...", "<br/>"]);
              setTimeout(() => {
                window.open(config.repoLink, "_blank");
              }, 1000);
            });
            break;
          case "banner":
            beepCommand?.play().then(async () => {
              await writeLines(["<br/>"]);
              await writeLines(BANNER);
            });
            break;
          case "clear":
            beepCommand?.play().then(async () => {
              setTimeout(async () => {
                if (!terminal?.current) return;
                if (!mutWriteLines?.current) return;
                terminal.current.innerHTML = "";
                terminal.current.appendChild(mutWriteLines.current);
                await writeLines(BANNER, false);
              });
            });
            break;
          default:
            beepCommand?.play().then(async () => {
              await writeLines(DEFAULT);
            });
            break;
        }
        resolve(true);
      }),
    );
  }

  async function userInputHandler(e: KeyboardEvent) {
    const key = e.key;
    switch (key) {
      case "Enter":
        e.preventDefault();
        await enterKey();
        break;
      case "Escape":
        e.preventDefault();
        beepKey?.play().then(async () => {
          if (!mutUserInput?.current) return;
          mutUserInput.current.value = "";
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        beepKey?.play().then(async () => {
          arrowKeys(key);
        });
        break;
      case "ArrowDown":
        e.preventDefault();
        beepKey?.play().then(async () => {
          arrowKeys(key);
        });
        break;
      case "Tab":
        e.preventDefault();
        beepKey?.play().then(async () => {
          tabKey();
        });
        break;
    }
  }

  async function boot() {
    beepKey = new Audio("/beep.mp3");
    beepCommand = new Audio("/beep.mp3");
    await commandHandler("clear");
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
  }, []);

  return (
    <>
      <div className="flex justify-center items-center visible min-h-screen py-8 lg:py-16">
        <div className="w-62 md:w-auto">
          <div ref={terminal} id="terminal" className="min-w-62 w-full">
            <a ref={mutWriteLines} id="write-lines" className="w-full"></a>
          </div>
          <div ref={command} className="w-full flex flex-wrap space-x-2">
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
                aria-label="command"
                maxLength={35}
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function setTerminalStyle() {
  if (!document) return;

  const style = document.createElement("style");
  const head = document.head;
  const background = `body {background-color: ${config.colors.background}}`;
  const foreground = `body {color: ${config.colors.foreground}}`;
  const inputBackground = `input {background-color: ${config.colors.background}}`;
  const inputForeground = `input {color: ${config.colors.prompt.input}}`;
  const outputColor = `.output {color: ${config.colors.prompt.input}}`;
  const preHost = `#pre-host {color: ${config.colors.prompt.host}}`;
  const host = `#host {color: ${config.colors.prompt.host}}`;
  const preUser = `#pre-user {color: ${config.colors.prompt.user}}`;
  const user = `#user {color: ${config.colors.prompt.user}}`;
  const prompt = `#prompt {color: ${config.colors.prompt.default}}`;
  const banner = `pre, .banner {color: ${config.colors.banner}}`;
  const link = `a {color: ${config.colors.link.text}}`;
  const linkHighlight = `a:hover {background-color: ${config.colors.link.highlightColor}}`;
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
