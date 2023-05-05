import axios from "axios";

export const api = axios.create({
  baseURL: "https://motor-shop-api-m6f7.onrender.com",
});

export const carsApi = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com/",
});
