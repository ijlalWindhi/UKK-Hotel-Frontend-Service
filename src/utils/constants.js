import { getLocalStorage } from "./helper/localStorage";

const BASE_API = "http://localhost:8080";
const BASE_API_IMAGE = "http://localhost:8080/images";

const LOCAL_STORAGE_TOKEN = "wikusamaHotel/token";
const LOCAL_STORAGE_USER = "wikusamaHotel/user";

const TOKEN = {
  headers: {
    Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
  },
};

export {
  BASE_API,
  BASE_API_IMAGE,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
  TOKEN,
};
