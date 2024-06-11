import { atom } from "recoil";

export const $Users = atom({
  key: "$Users",
  default: [
    { name: "ali", email: "ali@icloud.com", password: 1234 },
    { name: "ahmed", email: "ahmed@icloud.com", password: 1234 },
    { name: "hossam", email: "hossam@icloud.com", password: 1234 },
  ],
});

export const $Domain = atom({
  key: "$Domain",
  default: { base: "http://project-api.napoliaeg.com" },
});
