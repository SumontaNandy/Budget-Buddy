import axios from "axios";
import { api_url, params } from ".";

/* Account */
export const getAllAccountTypes = () =>
  axios.get(api_url(`account-types/`)).then((res) => res.data);

export const getAccountsForAccountType = (type_id) =>
  axios.get(api_url(`account-types/${type_id}`)).then((res) => res.data);

export const getAllAccounts = () =>
  axios.get(api_url(`account/`)).then((res) => res.data);

export const addAccount = (account) =>
  axios.post(api_url(`account/`), account, params).then((res) => res.data);

/* Transaction */
export const getIncomes = (account_id) =>
  axios.get(api_url(`account/${account_id}/deposite`)).then((res) => res.data);

export const addIncome = (account_id, income) =>
  axios.post(api_url(`account/${account_id}/deposite`), income, params).then((res) => res.data);

export const getUpcomingTransactions = () =>
  axios.get(api_url(`spending-plan/recur/?upcoming=1`)).then((res) => res.data);

export const getAllRecurringExpenses = (params) =>
  axios.get(api_url(`spending-plan/recur/`), {
    params: params
  }).then((res) => res.data);

export const getAllOneTimeExpenses = (params) =>
  axios.get(api_url(`spending-plan/one/`), {
    params: params
  }).then((res) => res.data);

export const getAllBills = (start, end) =>
  axios.get(api_url(`spending-plan/recur/`), {
    params: { type: "BILL" }
  }).then((res) => res.data);