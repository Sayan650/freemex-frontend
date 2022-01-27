import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingSection from "./pages/landing/landing";
import Portfolio from "./pages/portfolio/portfolio";
import Leaderboard from "./pages/leaderboard/leaderboard"
import Transaction from "./pages/transaction/transaction";
import Market from "./pages/market/market";
import Dashboard from "./pages/dashboard/dashboard"
import Timer from "./pages/timer/timer"


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
                  <Route exact path="/market">
                    <Market />
                </Route>
                <Route exact path="/leaderboard">
                    <Leaderboard/>
                </Route>
                <Route exact path="/transactions">
                    <Transaction />
                </Route>
                 <Route exact path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route exact path="/timer">
                    <Timer />
                </Route>
                <Route exact path="/*">
                    <LandingSection />
                </Route>
            </Switch>
        </Router>
    )
}

export default ReactRouterSetup;