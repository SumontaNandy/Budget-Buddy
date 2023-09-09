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

export const getAllRecurringExpenses = (page, per_page) =>
  axios.get(api_url(`spending-plan/recur/`), null, {
    params: { page, per_page }
  }).then((res) => res.data);

export const getAllOneTimeExpenses = (page, per_page) =>
  axios.get(api_url(`spending-plan/one/`), null, {
    params: { page, per_page }
  }).then((res) => res.data);

export const getAllBills = () =>
  axios.get(api_url(`spending-plan/recur/`), {
    params: { type: "BILL" }
  }).then((res) => res.data);

export const getSavingGoals = () =>
  axios.get(api_url(`goal/`)).then((res) => res.data);


export const createGoal = (goal) =>
  axios.post(api_url(`goal/create`), goal, params).then((res) => res.data);

export const editGoal = (goal) =>
  axios.post(api_url(`goal/edit`), goal, params).then((res) => res.data);

export const deleteGoal = (goalName) =>
  axios.post(api_url(`goal/delete/${goalName}`), params).then((res) => res.data);





