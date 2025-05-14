import axios from "axios";

export default axios.create({
  baseURL: "https://zenquotes.io/api",
  params: {
    key: "b385ba8c75cdfd55269a1bb331e33e22",
  },
});
