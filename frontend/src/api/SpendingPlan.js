import axios from "axios";
import { api_url, params } from ".";

export const getGoal = (id) =>
  axios.get(api_url(`goal/${id}`), params).then((res) => res.data);

export const getOnetime = (id) =>
  axios.get(api_url(`spending-plan/one/${id}`), params).then((res) => res.data);

export const getRecurring = (id) =>
  axios.get(api_url(`spending-plan/recur/${id}`), params).then((res) => res.data);

export const getAllRecurringExpenses = (params) =>
  axios.get(api_url(`spending-plan/recur/`), {
    params: params
  }).then((res) => res.data);

export const getAllOneTimeExpenses = (params) =>
  axios.get(api_url(`spending-plan/one/`), {
    params: params
  }).then((res) => res.data);

export const addOnetime = (expense) =>
  axios.post(api_url(`spending-plan/one/`), expense, params).then((res) => res.data);

export const addRecurring = (expense) =>
  axios.post(api_url(`spending-plan/recur/`), expense, params).then((res) => res.data);