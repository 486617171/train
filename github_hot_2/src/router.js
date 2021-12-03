import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from './app.js';

export default function RootRouter() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <App>
                    <Switch>
                        <Redirect exact from="/" to="/popular"></Redirect>
                        <Route path="/popular" component={lazy(() => import('./pages/popular'))}></Route>
                        <Route path="/battle" component={lazy(() => import('./pages/battle'))}></Route>
                    </Switch>
                </App>
            </Router>
        </Suspense>
    )
}