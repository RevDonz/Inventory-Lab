import { SidebarContext } from '../../context/SidebarContext';
import { useContext, useState } from 'react';
import {
    MenuIcon,
    OutlineLogoutIcon,
    OutlinePersonIcon,
    SearchIcon,
} from '../../icons';
import {
    Avatar,
    Dropdown,
    DropdownItem,
    Input,
} from '@windmill/react-ui';

const Header = () => {
    const { toggleSidebar } = useContext(SidebarContext);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    function handleProfileClick() {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }

    const logout = async () => {
        window.localStorage.removeItem('token')
        window.location.href = `/`;
    }

    return (
        <header className='z-10 py-4 bg-indigo-50 dark:bg-gray-800'>
            <div className='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300'>
                {/* <!-- Mobile hamburger --> */}
                <button
                    className='p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple'
                    onClick={toggleSidebar}
                    aria-label='Menu'
                >
                    <MenuIcon className='w-6 h-6' aria-hidden='true' />
                </button>
                {/* <!-- Search input --> */}
                <div className='flex justify-center flex-1 lg:mr-32'>
                    <div className='relative w-full max-w-xl mr-6 focus-within:text-purple-500'>
                        <div className='absolute inset-y-0 flex items-center pl-2'>
                            <SearchIcon
                                className='w-4 h-4'
                                aria-hidden='true'
                            />
                        </div>
                        <Input
                            className='pl-8 text-gray-700 bg-gray-200 focus:bg-gray-50'
                            placeholder='Search for projects'
                            aria-label='Search'
                            type="text"
                        />
                    </div>
                </div>
                <ul className='flex items-center flex-shrink-0 space-x-6'>
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
                            onClose={() => setIsProfileMenuOpen(true)}
                        >
                            <DropdownItem tag='a' href='#'>
                                <OutlinePersonIcon
                                    className='w-4 h-4 mr-3'
                                    aria-hidden='true'
                                />
                                <span>Profile</span>
                            </DropdownItem>
                            <DropdownItem onClick={logout}>
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
