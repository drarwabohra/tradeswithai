"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
const storageKey = "tradeswithai-theme";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function updateThemeColor() {
  const color = getComputedStyle(document.documentElement).getPropertyValue("--color-background").trim();
  const meta = document.querySelector('meta[name="theme-color"]');
  if (color && meta) meta.setAttribute("content", color);
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  updateThemeColor();
  window.dispatchEvent(new Event("tradeswithai-theme-change"));
}

function subscribe(listener: () => void) {
  const storageChanged = (event: StorageEvent) => {
    if (event.key === storageKey) applyTheme(event.newValue === "light" ? "light" : "dark");
  };
  updateThemeColor();
  window.addEventListener("tradeswithai-theme-change", listener);
  window.addEventListener("storage", storageChanged);
  return () => {
    window.removeEventListener("tradeswithai-theme-change", listener);
    window.removeEventListener("storage", storageChanged);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "dark" as const);
  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return <button type="button" className="theme-toggle" aria-label={label} title={label} onClick={() => {
    const nextTheme = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try { localStorage.setItem(storageKey, nextTheme); } catch { /* The toggle also works when storage is unavailable. */ }
  }}>{theme === "dark" ? <Sun size={18} strokeWidth={1.5} aria-hidden="true" /> : <Moon size={18} strokeWidth={1.5} aria-hidden="true" />}</button>;
}
