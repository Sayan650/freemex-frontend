import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingSection from "./pages/landing/landing";
import Portfolio from "./pages/portfolio/portfolio";

const ReactRouterSetup = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingSection />
                </Route>
                <Route exact path="/portfolio">
                    <Portfolio />
                </Route>
            </Switch>
        </Router>
    )
}

export default ReactRouterSetup;