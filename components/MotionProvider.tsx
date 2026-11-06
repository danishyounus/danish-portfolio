"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MotionPref = {
  motionOn: boolean;
  toggleMotion: () => void;
  ready: boolean;
};

const MotionContext = createContext<MotionPref>({
  motionOn: true,
  toggleMotion: () => {},
  ready: false,
});

const STORAGE_KEY = "danish-portfolio-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  const [motionOn, setMotionOn] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const systemReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = stored === null ? !systemReduced : stored === "on";
    setMotionOn(next);
    setReady(true);
    document.documentElement.dataset.motion = next ? "on" : "off";
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionOn((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      document.documentElement.dataset.motion = next ? "on" : "off";
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ motionOn, toggleMotion, ready }),
    [motionOn, toggleMotion, ready]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionPref() {
  return useContext(MotionContext);
}
