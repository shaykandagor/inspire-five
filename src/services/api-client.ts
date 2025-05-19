import axios from "axios";

export const API_KEY = "b385ba8c75cdfd55269a1bb331e33e22";

export default axios.create({
  baseURL: "https://zenquotes.io/api",
});
