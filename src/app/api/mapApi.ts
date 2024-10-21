import axios from "axios";

const baseURL = `https://rsapi.goong.io`;

const mapApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default mapApi;
