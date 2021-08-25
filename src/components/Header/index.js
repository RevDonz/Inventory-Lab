import { Avatar, Badge, Dropdown, DropdownItem } from '@windmill/react-ui';
import { useState } from 'react';
import {
    BellIcon,
    OutlineCogIcon,
    OutlineLogoutIcon,
    OutlinePersonIcon,
} from '../../icons';

const Header = () => {
    const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    console.log(isProfileMenuOpen);

    function handleNotificationsClick() {
        setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
    }

    function handleProfileClick() {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }

    return (
        <header class='z-10 py-4 bg-white shadow-md dark:bg-gray-800'>
            <div class='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300'>
                {/* <!-- Mobile hamburger --> */}
                <button
                    class='p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple'
                    aria-label='Menu'
                >
                    <svg
                        class='w-6 h-6'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                    >
                        <path
                            fill-rule='evenodd'
                            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                            clip-rule='evenodd'
                        ></path>
                    </svg>
                </button>
                {/* <!-- Search input --> */}
                <div class='flex justify-center flex-1 lg:mr-32'>
                    <div class='relative w-full max-w-xl mr-6 focus-within:text-purple-500'>
                        <div class='absolute inset-y-0 flex items-center pl-2'>
                            <svg
                                class='w-4 h-4'
                                aria-hidden='true'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    fill-rule='evenodd'
                                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                    clip-rule='evenodd'
                                ></path>
                            </svg>
                        </div>
                        <input
                            class='w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input'
                            type='text'
                            placeholder='Search for projects'
                            aria-label='Search'
                        />
                    </div>
                </div>
                <ul class='flex items-center flex-shrink-0 space-x-6'>
                    {/* <!-- Theme toggler --> */}
                    <li class='flex'>
                        <button
                            class='rounded-md focus:outline-none focus:shadow-outline-purple'
                            //   @click="toggleTheme"
                            aria-label='Toggle color mode'
                        >
                            <template x-if='!dark'>
                                <svg
                                    class='w-5 h-5'
                                    aria-hidden='true'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
                                </svg>
                            </template>
                            <template x-if='dark'>
                                <svg
                                    class='w-5 h-5'
                                    aria-hidden='true'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fill-rule='evenodd'
                                        d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                                        clip-rule='evenodd'
                                    ></path>
                                </svg>
                            </template>
                        </button>
                    </li>
                    {/* <!-- Notifications menu --> */}
                    <li className='relative'>
                        <button
                            className='relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple'
                            onClick={handleNotificationsClick}
                            aria-label='Notifications'
                            aria-haspopup='true'
                        >
                            <BellIcon className='w-5 h-5' aria-hidden='true' />
                            {/* <!-- Notification badge --> */}
                            <span
                                aria-hidden='true'
                                className='absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800'
                            ></span>
                        </button>

                        <Dropdown
                            align='right'
                            isOpen={isNotificationsMenuOpen}
                            onClose={() => setIsNotificationsMenuOpen(false)}
                        >
                            <DropdownItem
                                tag='a'
                                href='#'
                                className='justify-between'
                            >
                                <span>Messages</span>
                                <Badge type='danger'>13</Badge>
                            </DropdownItem>
                            <DropdownItem
                                tag='a'
                                href='#'
                                className='justify-between'
                            >
                                <span>Sales</span>
                                <Badge type='danger'>2</Badge>
                            </DropdownItem>
                            <DropdownItem onClick={() => alert('Alerts!')}>
                                <span>Alerts</span>
                            </DropdownItem>
                        </Dropdown>
                    </li>
                    {/* <!-- Profile menu --> */}
                    <li className='relative'>
                        <button
                            className='rounded-full focus:shadow-outline-purple focus:outline-none'
                            onClick={handleProfileClick}
                            aria-label='Account'
                            aria-haspopup='true'
                        >
                            <Avatar
                                className='align-middle'
                                src='https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82'
                                alt=''
                                aria-hidden='true'
                            />
                        </button>
                        <Dropdown
                            align='right'
                            isOpen={isProfileMenuOpen}
                            onClose={() => setIsProfileMenuOpen(false)}
                        >
                            <DropdownItem tag='a' href='#'>
                                <OutlinePersonIcon
                                    className='w-4 h-4 mr-3'
                                    aria-hidden='true'
                                />
                                <span>Profile</span>
                            </DropdownItem>
                            <DropdownItem tag='a' href='#'>
                                <OutlineCogIcon
                                    className='w-4 h-4 mr-3'
                                    aria-hidden='true'
                                />
                                <span>Settings</span>
                            </DropdownItem>
                            <DropdownItem onClick={() => alert('Log out!')}>
                                <OutlineLogoutIcon
                                    className='w-4 h-4 mr-3'
                                    aria-hidden='true'
                                />
                                <span>Log out</span>
                            </DropdownItem>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
