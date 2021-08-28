import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const Layout = lazy(() => import('./containers/Layout'))
const access_token = window.localStorage.getItem('token')

function App() {
    return (
        <Router>
            <Switch>
                <Suspense fallback={<h1>Loading..</h1>}>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    {access_token ? <Route path="/app" component={Layout}/> : '' }
                    // <Route path="/app" component={Layout} />
                </Suspense>
            </Switch>
        </Router>
    );
}

export default App;
