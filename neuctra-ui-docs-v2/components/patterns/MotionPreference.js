"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { MotionConfig } from "framer-motion";
import { Pause, Play } from "lucide-react";

const STORAGE_KEY = "neuctra-motion";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

// In memory first, so the toggle still works when storage is blocked.
let storedPaused = null;
const pauseListeners = new Set();

function readPaused() {
  if (storedPaused === null) {
    try {
      storedPaused = localStorage.getItem(STORAGE_KEY) === "paused";
    } catch {
      storedPaused = false;
    }
  }
  return storedPaused;
}

function subscribePaused(listener) {
  pauseListeners.add(listener);
  return () => pauseListeners.delete(listener);
}

function togglePaused() {
  storedPaused = !readPaused();
  try {
    localStorage.setItem(STORAGE_KEY, storedPaused ? "paused" : "running");
  } catch {
    // The preference still applies for this visit.
  }
  pauseListeners.forEach((listener) => listener());
}

function subscribeReduced(listener) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

const readReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const onServer = () => false;

const MotionPreferenceContext = createContext({
  paused: false,
  reduced: false,
  toggle: () => {},
});

export function MotionPreferenceProvider({ children }) {
  const paused = useSyncExternalStore(subscribePaused, readPaused, onServer);
  const reduced = useSyncExternalStore(subscribeReduced, readReduced, onServer);

  // CSS loops are paused from one attribute, so they never re-render React.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = paused ? "paused" : "running";
    return () => {
      delete root.dataset.motion;
    };
  }, [paused]);

  const value = useMemo(
    () => ({ paused, reduced, toggle: togglePaused }),
    [paused, reduced],
  );

  return (
    <MotionPreferenceContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      {!reduced && (
        <button
          type="button"
          onClick={togglePaused}
          aria-pressed={paused}
          aria-label={paused ? "Play animations" : "Pause animations"}
          title={paused ? "Play animations" : "Pause animations"}
          className="fixed bottom-4 left-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-secondary backdrop-blur transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </MotionPreferenceContext.Provider>
  );
}

export const useMotionPreference = () => useContext(MotionPreferenceContext);

/** True when looping motion should hold still. */
export function useMotionStill() {
  const { paused, reduced } = useContext(MotionPreferenceContext);
  return paused || reduced;
}
