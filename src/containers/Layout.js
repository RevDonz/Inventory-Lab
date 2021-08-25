import React, { Suspense } from 'react';
import routes from '../routes'

import { Header, Sidebar } from '../components';
import Main from './Main';
import { Switch, Route, Redirect } from 'react-router-dom'

const Layout = () => {

    return (
        <div class='flex h-screen bg-gray-50 dark:bg-gray-900 font-poppins'>
            {/* <!-- Desktop sidebar --> */}
            <Sidebar />
            <div class='flex flex-col flex-1'>
                <Header />
                <Main>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Switch>
                            {routes.map((route, i) => {
                                return route.component ? (
                                    <Route 
                                        key={i} 
                                        exact={true} 
                                        path={`/app${route.path}`} 
                                        render={(props) => <route.component {...props} />}
                                    />
                                ) : null
                            })}
                            <Redirect exact from="/app" to="/app/dashboard" />
                        </Switch>
                    </Suspense>
                </Main>
            </div>
        </div>
    );
};

export default Layout;
