import axios from "axios";

const URL = "http://localhost:8080/api";

export default axios.create({ baseURL: URL });

export const BASE_PATH = "http://localhost:8080";
