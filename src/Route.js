import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingSection from "./pages/landing/landing";

const ReactRouterSetup =() => {
    return (
   <Router>
       <Switch>
            <Route exact path="/">
           <LandingSection />
            </Route>
           </Switch>
   </Router>
    )
}

export default ReactRouterSetup;