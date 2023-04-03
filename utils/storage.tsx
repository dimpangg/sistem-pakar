import { LocalStorageKey } from "@/types";

export const setLocalStorage = (key: LocalStorageKey, value: unknown) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorage = (key: LocalStorageKey) =>
  JSON.parse(localStorage.getItem(key) || "null");
