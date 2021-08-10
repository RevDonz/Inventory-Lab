import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Dashboard, Login, Register } from '../../pages'



function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }
  
function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    // return userToken?.token
    console.log(userToken);
  }

const Routes = () => {
    const token = getToken();
    
    if (!token) {
        return <Login setToken={setToken} />
    }

    
    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
