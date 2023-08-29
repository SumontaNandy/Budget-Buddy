import axios from "axios";
import { api_url } from ".";

export const getIncomes = (account_id) =>
  axios.get(api_url(`account/${account_id}/deposite`)).then((res) => res.data);

export const getAllAccountTypes = () =>
  axios.get(api_url(`account-types/`)).then((res) => res.data);

export const getAccountsForAccountType = (type_id) =>
  axios.get(api_url(`account-types/${type_id}`)).then((res) => res.data);

export const getAllAccounts = () =>
  axios.get(api_url(`account/`)).then((res) => res.data);