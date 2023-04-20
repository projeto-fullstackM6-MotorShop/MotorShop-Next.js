import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const carsApi = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com/",
});
