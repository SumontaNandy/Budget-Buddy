import React, { lazy } from "react";
import { Switch, BrowserRouter as Router, Link, Route } from "react-router-dom";

//const AccountTypes = lazy(() => import('./AccountTypes'));
import AccountTypes from './AccountTypes';
import Home from './Home';
import Contact from './Contact';

export default function AppRoutes()
{
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/account-types" component={AccountTypes} />
                <Route path="/contact" component={Contact} />
            </Switch>
        </Router>
    );
}