import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, Register, Home, CreateItem, UpdateItem } from '../../pages'


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
                <Route exact path="/admin/createItem">
                    <CreateItem/>
                </Route>
                <Route exact path="/admin/updateItem">
                    <UpdateItem/>
                </Route>
                <Route exact path="/admin/home">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
