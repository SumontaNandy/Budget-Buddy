import React, { lazy } from "react";
import { Switch, BrowserRouter as Router, Link, Route } from "react-router-dom";

//const AccountTypes = lazy(() => import('./AccountTypes'));
import AccountTypes from './pages/AccountTypes/AccountTypes';
import Contact from './pages/Contact/Contact';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Transaction from './pages/Transaction/Transaction';
import Recurring from './pages/Recurring/Recurring';
import SavingGoalsSidebarMenu from './components/SavingGoalsSidebarMenu';
import SpecialExpenses from './pages/SpecialExpenses/SpecialExpenses';
import TaxSidebarMenu from './components/TaxSidebarMenu';

export default function AppRoutes()
{
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/account-types" component={AccountTypes} />
                <Route path="/home" component={Home} />
                <Route path="/transactions" component={Transaction} />
                <Route path="/recurring" component={Recurring} />
                <Route path="/contact" component={Contact} />
                <Route path="/signup" component={Signup} />
                <Route path="/saving-goals" component={SavingGoalsSidebarMenu} />
                <Route path="/special-expenses" component={SpecialExpenses} />
                <Route path="/tax" component={TaxSidebarMenu} />
            </Switch>
        </Router>
    );
}
