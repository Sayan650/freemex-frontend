import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingSection from "./pages/landing/landing";
import Portfolio from "./pages/portfolio/portfolio";
import Leaderboard from "./pages/leaderboard/leaderboard"

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
                <Route exact path="/leaderboard">
                    <Leaderboard/>
                </Route>
            </Switch>
        </Router>
    )
}

export default ReactRouterSetup;