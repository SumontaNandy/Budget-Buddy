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


export const getSavingGoals = (page=1, per_page=12) =>
  axios.get(api_url(`goal/`), { params: { page, per_page} }).then((res) => res.data);

export const createGoal = (goal) =>
  axios.post(api_url(`goal/`), goal, params).then((res) => res.data);

export const editGoal = (goal, id) =>
  axios.put(api_url(`goal/${id}`), goal, params).then((res) => res.data);

export const deleteGoal = (goalName) =>
  axios.delete(api_url(`goal/delete/${goalName}`), params).then((res) => res.data);


export const getSpecialExpenses = () =>
  axios.get(api_url(`watchlist`)).then((res) => res.data);

export const createSpecialExpense = (expense) =>
  axios.post(api_url(`watchlist`), expense, params).then((res) => res.data);

export const editSpecialExpense = (expense, id) =>
  axios.put(api_url(`watchlist/${id}`), expense, params).then((res) => res.data);

export const deleteSpecialExpense = (id) =>
  axios.delete(api_url(`watchlist/${id}`), params).then((res) => res.data);






