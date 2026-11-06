"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/**
 * Returns true when WebGL is genuinely available.
 * Used to skip the 3D scenes instead of crashing or showing a blank canvas.
 */
export function useWebGL(): boolean {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setOk(Boolean(gl));
    } catch {
      setOk(false);
    }
  }, []);

  return ok;
}

/** Tracks whether an element is currently visible in the viewport. */
export function useOnScreen<T extends Element>(
  ref: React.RefObject<T | null>,
  rootMargin = "120px"
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return visible;
}
