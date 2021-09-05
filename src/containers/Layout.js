import React, { lazy, useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import routes from '../routes';
import { Header, Sidebar } from '../components';
import Main from '../containers/Main';
import { SidebarContext } from '../context/SidebarContext';
import axios from 'axios';

const Loading = lazy(() => import('../pages/Loading'))
const Page404 = lazy(() => import('../pages/404'));
const Page403 = lazy(() => import('../pages/403'));

const Layout = () => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    const [isLogin, setIsLogin] = useState(false);
    const [typeUser, setTypeuser] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    let location = useLocation();
    
    useEffect(() => {
        closeSidebar();
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps
    
    const getItem = () => {
        const accesstoken = localStorage.getItem('token');
        axios
            .get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
                headers: {
                    Authorization: `token ${accesstoken}`,
                },
            })
            .then((res) => {
                if (res.data.status) {
                    setTypeuser(res.data.type)
                    setIsLogin(true);
                    setIsLoading(false)
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getItem()
    }, []);

    return (
        <div
            className={`flex h-screen bg-gray-50 dark:bg-gray-900 font-poppins ${
                isSidebarOpen && 'overflow-hidden'
            }`}
        >
            {isLogin ? (
                <Sidebar />                
            ) : null}
            
            <div className='flex flex-col flex-1 w-full'>
                {isLogin ? (
                    <Header />
                ) : null}
                <Main>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <Switch>
                                {isLogin ? (
                                    routes.map((route, i) => {
                                        return route.component && route.type === typeUser ? (
                                            <Route
                                                key={i}
                                                exact={true}
                                                path={`/app${route.path}`}
                                                render={(props) => (
                                                    <route.component {...props} />
                                                )}
                                            />
                                        ) : null;
                                    })
                                ) : (
                                    <Route component={Page403} />
                                )}
                                <Redirect exact from='/app' to='/app/dashboard' />
                                <Route component={Page404} />
                            </Switch>
                        )}
                </Main>
            </div>
        </div>
    );
};

export default Layout;
