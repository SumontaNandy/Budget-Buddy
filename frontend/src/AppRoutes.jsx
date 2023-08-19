import React, { lazy } from "react";
import { Switch, BrowserRouter as Router, Link, Route } from "react-router-dom";

//const AccountTypes = lazy(() => import('./AccountTypes'));
import AccountTypes from './pages/AccountTypes/AccountTypes';
import Contact from './pages/Contact/Contact';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import SidebarMenu from './components/SidebarMenu';
import SavingGoalsSidebarMenu from './components/SavingGoalsSidebarMenu';
import {SavingGoals} from './pages/SavingGoals/SavingGoals';

export default function AppRoutes()
{
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/account-types" component={AccountTypes} />
                <Route path="/home" component={SidebarMenu} />
                <Route path="/contact" component={Contact} />
                <Route path="/signup" component={Signup} />
                <Route path="/saving-goals" component={SavingGoalsSidebarMenu} />
            </Switch>
        </Router>
    );
}
