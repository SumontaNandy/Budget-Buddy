import axios from "axios";
import { api_url, params } from ".";

export const addOnetime = (onetimeExpense) =>
  axios.post(api_url(`spending-plan/one/`), onetimeExpense, params).then((res) => res.data);