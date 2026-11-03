"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "./translations";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "lang";
const CHANGE_EVENT = "geoaeo-lang-change";

// Fallback when localStorage is unavailable (private mode, blocked storage).
let memoryLang: Lang | null = null;

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ru" || stored === "kk") return stored;
  } catch {
    // storage blocked: use the in-memory value
  }
  return memoryLang ?? "ru";
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// The server and the first client render always use "ru", so hydration matches.
// After hydration React switches to the stored language without a state-in-effect.
function getServerLang(): Lang {
  return "ru";
}

export function LangProvider({ children }: { children: ReactNode }): React.ReactElement {
  const lang = useSyncExternalStore(subscribe, readStoredLang, getServerLang);

  const setLang = useCallback((newLang: Lang): void => {
    memoryLang = newLang;
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore: in-memory value is used
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used within LangProvider");
  return ctx;
}
