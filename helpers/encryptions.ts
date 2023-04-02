import { AES, enc } from "crypto-js";
import { SECRET_KEY } from "./environments";

export const encryptedPrefix = "encrypted-";

export const encryptValue = (value: string) => {
  return encryptedPrefix + AES.encrypt(value, SECRET_KEY).toString();
};

export const decryptValue = (value: string) => {
  return AES.decrypt(value.replace(encryptedPrefix, ""), SECRET_KEY).toString(
    enc.Utf8
  );
};
