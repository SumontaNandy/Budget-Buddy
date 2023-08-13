import React, { lazy } from "react";
import { Switch, BrowserRouter as Router, Link, Route } from "react-router-dom";

//const AccountTypes = lazy(() => import('./AccountTypes'));
import AccountTypes from './AccountTypes';
import Home from './Home';
import Contact from './Contact';
import { Login } from './Login';
import { Signup } from './Signup';

export default function AppRoutes()
{
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/account-types" component={AccountTypes} />
                <Route path="/home" component={Home} />
                <Route path="/contact" component={Contact} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </Router>
    );
}
