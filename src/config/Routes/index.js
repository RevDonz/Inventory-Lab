import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Dashboard, Register } from '../../pages'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
