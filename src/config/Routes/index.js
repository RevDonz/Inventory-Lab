import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, Register, Home, CreateItem } from '../../pages'


const Routes = () => {
    
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/createItem">
                    <CreateItem/>
                </Route>
                <Route exact path="/admin/home">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
