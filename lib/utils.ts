import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** "2026-09-02" → "2 September 2026" */
export function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function isExpired(iso: string | null): boolean {
  if (!iso) return false;
  return new Date(`${iso}T23:59:59`).getTime() < Date.now();
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
