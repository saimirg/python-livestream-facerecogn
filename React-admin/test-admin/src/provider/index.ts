import jsonProvider from './dataProvider';
import { fetchUtils } from "react-admin";
import { BASE_URL } from "./config";

const fetchJson = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  // add your own headers here
  const token = localStorage.getItem("access_token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export default jsonProvider(`${BASE_URL}`, fetchJson);