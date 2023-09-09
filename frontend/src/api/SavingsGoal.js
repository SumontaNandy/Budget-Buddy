import axios from "axios";
import { api_url, params } from ".";

export const getGoal = (id) =>
  axios.get(api_url(`goal/${id}`), params).then((res) => res.data);