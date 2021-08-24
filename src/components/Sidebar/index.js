import { NavLink, Route } from 'react-router-dom';
import * as Icons from '../../icons';
import {routes} from '../../config';

const Icon = ({ icon, ...props }) => {
    const Icon = Icons[icon];
    return <Icon {...props} />;
};

const Sidebar = () => {
    return (
        <aside class='z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0'>
            <div class='py-4 text-gray-500 dark:text-gray-400'>
                <a
                    class='ml-6 text-lg font-bold text-gray-800 dark:text-gray-200'
                    href='/'
                >
                    Windmill
                </a>
                <ul className='mt-6'>
                    {routes.map((menu) => (
                        <li class='relative px-6 py-3' key={menu.name}>
                            <NavLink
                                exact
                                to={menu.path}
                                className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                                activeClassName='text-gray-800 dark:text-gray-100'
                            >
                                <Route path={menu.path} exact={menu.exact}>
                                    <span
                                        className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
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
                    ))}
                </ul>
                <div class='px-6 my-6'>
                    <button class='flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>
                        Create account
                        <span class='ml-2' aria-hidden='true'>
                            +
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
