import axios from "axios";

const env = () => {
  return axios.create({
    baseURL: `https://guigofu-deno-api-30.deno.dev/`,
  });
};

export const api = env();