import axios from "axios";
import { api_url, params } from ".";

export const addOnetime = (onetimeExpense) =>
  axios.post(api_url(`spending-plan/one/`), onetimeExpense, params).then((res) => res.data);

export const getGoal = (id) =>
  axios.get(api_url(`goal/${id}`), params).then((res) => res.data);

export const getOnetime = (id) =>
  axios.get(api_url(`spending-plan/one/${id}`), params).then((res) => res.data);

export const getRecurring = (id) =>
  axios.get(api_url(`spending-plan/recur/${id}`), params).then((res) => res.data);