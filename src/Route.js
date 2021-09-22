import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingSection from "./pages/landing/landing";
import Portfolio from "./pages/portfolio/portfolio";
import Leaderboard from "./pages/leaderboard/leaderboard"
import Transaction from "./pages/transaction/transaction";

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
                <Route exact path="/transactions">
                    <Transaction />
                </Route>
            </Switch>
        </Router>
    )
}

export default ReactRouterSetup;