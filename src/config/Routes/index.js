import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, Register, Home, CreateItem } from '../../pages'


const Routes = () => {
    
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/dashboard">
                    <Home/>
                </Route>
                <Route path="/createItem">
                    <CreateItem/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
