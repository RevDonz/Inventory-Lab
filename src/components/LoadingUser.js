import React from 'react';

const LoadingUser = () => {
    return (
        <div className='border bg-white w-2/3 rounded-md flex items-center animate-pulse'>
            <div className='flex flex-col w-1/2 md:w-2/3 pl-5'>
                <div className='flex flex-col mb-2 md:flex-row md:space-x-2 font-normal text-gray-700 text-xs md:text-sm py-2'>
                    <span className="w-20 md:w-48 h-8 bg-indigo-200"></span>
                </div>
                <div className='flex flex-col mb-2 md:flex-row md:space-x-2 font-normal text-gray-700 text-xs md:text-sm py-2'>
                    <span className="md:w-24 w-12 h-5 bg-indigo-200"></span>
                </div>
                <div className='flex flex-col mb-2 md:flex-row md:space-x-2 font-normal text-gray-700 text-xs md:text-sm py-2'>
                    <span className="md:w-12 w-6 h-5 bg-indigo-200"></span>
                </div>
            </div>
            <div className='w-1/3'>
                <div className='items-center justify-end flex'>
                    <span className="bg-indigo-200 p-12 md:p-24 w-5 rounded-md"></span>
                </div>
            </div>
        </div>
    );
};

export default LoadingUser;
