import { atom } from "recoil";

export const isDarkMode = atom({
  key: "DarkMode",
  default: false
})

export const back = atom({
  key: "Back",
  default: "#"
})