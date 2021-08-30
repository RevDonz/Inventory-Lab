import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import * as Icons from '../../icons';
import routes from '../../routes/sidebar';

const Icon = ({ icon, ...props }) => {
    const Icon = Icons[icon];
    return <Icon {...props} />;
};


const SidebarContent = () => {
    const [typeUser, setTypeuser] = useState("")

    const getUserById = () => {
        const accesstoken = localStorage.getItem('token');
        axios
        .get('https://inventorylab.herokuapp.com/user/getdetailuser/', {
            headers: {
                Authorization: `token ${accesstoken}`,
            },
        })
        .then((res) => {
            setTypeuser(res.data.type)
        })
    };
    
    useEffect(() => {
        getUserById()
    }, [])

    return (
        <div className='py-4 text-gray-500 dark:text-gray-400'>
            <a
                className='ml-6 text-lg font-bold text-gray-800 dark:text-gray-200'
                href='/app/dashboard'
            >
                Inventory-Lab
            </a>
            <ul className='mt-6'>
                {routes.map((menu) => {
                    return menu.type === typeUser ? (
                        <li className='relative px-6 py-3' key={menu.name}>
                            <NavLink
                                exact
                                to={menu.path}
                                className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                                activeClassName='text-gray-800 dark:text-gray-100'
                            >
                                <Route path={menu.path} exact={menu.exact}>
                                    <span
                                        className='absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-tr-lg rounded-br-lg'
                                        aria-hidden='true'
                                    ></span>
                                </Route>
                                <Icon
                                    className='w-5 h-5'
                                    aria-hidden='true'
                                    icon={menu.icon}
                                />
                                <span className='ml-4'>{menu.name}</span>
                            </NavLink>
                        </li>
                    ) : null;
                })}
            </ul>
        </div>
    );
};

export default SidebarContent;
