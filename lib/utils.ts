import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  const f = new Intl.DateTimeFormat("en-in", {
    dateStyle: "short",
  });

  return f.format(date);
};
