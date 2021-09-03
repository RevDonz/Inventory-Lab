import React from 'react';

const Loading = () => {
    return (
        <div className='animate-pulse'>
            <header className='z-40 py-4 bg-indigo-50 shadow-bottom dark:bg-gray-800'>
                <div className='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300'>
                    {/* <!-- Mobile hamburger --> */}
                    <button
                        className='p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple'
                        aria-label='Menu'
                    >
                        <span className='w-6 h-6 bg-black'></span>
                    </button>
                    {/* <!-- Search input --> */}
                    <div className='flex justify-center items-center flex-1 lg:mr-32'>
                        <span className='py-5 w-1/2 bg-indigo-200 rounded-md'></span>
                    </div>
                </div>
            </header>
            <div className='flex'>
                <div className='w-1/5 hidden md:block'>
                    <ul className="list-none">
                        <li className='relative px-6 py-3'>
                            <div
                                className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                                activeclassname='text-gray-800 dark:text-gray-100'
                            >
                                <span className='w-5 h-5 bg-indigo-200 rounded-full'></span>
                                <span className='ml-4 h-5 w-1/2 bg-indigo-200'></span>
                            </div>
                        </li>
                        <li className='relative px-6 py-3'>
                            <div
                                className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                                activeclassname='text-gray-800 dark:text-gray-100'
                            >
                                <span className='w-5 h-5 bg-indigo-200 rounded-full'></span>
                                <span className='ml-4 h-5 w-3/4 bg-indigo-200'></span>
                            </div>
                        </li>
                        <li className='relative px-6 py-3'>
                            <div
                                className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200'
                                activeclassname='text-gray-800 dark:text-gray-100'
                            >
                                <span className='w-5 h-5 bg-indigo-200 rounded-full'></span>
                                <span className='ml-4 h-5 w-1/4 bg-indigo-200'></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='container w-4/5 mx-auto grid grid-cols-2 gap-5'>
                    <div className='bg-indigo-200 p-24 rounded-md'></div>
                    <div className='bg-indigo-200 p-24 rounded-md'></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
