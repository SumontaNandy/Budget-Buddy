import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

//const AccountTypes = lazy(() => import('./AccountTypes'));
import AccountTypes from './pages/AccountTypes/AccountTypes';
import AccountType from './pages/AccountTypes/AccountType';
import Contact from './pages/Contact/Contact';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';

import Home from './pages/Home/Home';
import SpendingPlan from './pages/SpendingPlan/SpendingPlan';

import TransactionDetails from "./pages/Transaction/TransactionDetails";
import Transaction from './pages/Transaction/Transaction';

import Recurring from './pages/Recurring/Recurring';
import SavingGoals from './pages/SavingGoals/SavingGoals';
import SpecialExpenses from './pages/SpecialExpenses/SpecialExpenses';
import Tax from './pages/Tax/Tax';

export default function AppRoutes()
{
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/signup" component={Signup} />

                <Route path="/home" component={Home} />
                <Route path="/spending-plan" component={SpendingPlan} />

                <Route path="/account-types/id/:type_id" component={AccountType} />
                <Route path="/account-types" component={AccountTypes} />

                <Route path="/transactions/:transaction_id/details" component={TransactionDetails} />
                <Route path="/transactions" component={Transaction} />
                <Route path="/recurring" component={Recurring} />
         
                <Route path="/saving-goals" component={SavingGoals} />
                <Route path="/special-expenses" component={SpecialExpenses} />
                <Route path="/tax" component={Tax} />

                <Route path="/contact" component={Contact} />
            </Switch>
        </Router>
    );
}
