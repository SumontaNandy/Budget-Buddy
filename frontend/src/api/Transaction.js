import axios from "axios";
import { api_url, params } from ".";

export const getAllTransactions = (params) =>
  axios.get(api_url(`transaction/`), {
    params: params
  }).then((res) => res.data);

export const addTransaction = (transaction) =>
  axios.post(api_url(`transaction/`), transaction, params).then((res) => res.data);