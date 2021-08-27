import React from 'react';

const Main = ({ children }) => {
    return (
        <main className='h-full pb-16 overflow-y-auto bg-indigo-50'>
            {/* <!-- Remove everything INSIDE this div to a really blank page --> */}
            <div className='container px-6 mx-auto grid'>{children}</div>
        </main>
    );
};

export default Main;
