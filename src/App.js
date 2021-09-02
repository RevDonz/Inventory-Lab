import { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Layout = lazy(() => import('./containers/Layout'));

function App() {
    return (
        <Router>
            <Switch>
                <Suspense fallback={""}>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    {/* <ProtectedRoute path="/app" component={Layout} isAuth={isAuth} /> */}
                    <Route path='/app' component={Layout} />
                </Suspense>
            </Switch>
        </Router>
    );
}

export default App;
