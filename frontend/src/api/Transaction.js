import axios from "axios";
import { api_url } from ".";

export const getIncomes = (account_id) =>
  axios.get(api_url(`account/${account_id}/deposite`)).then((res) => res.data);