import React from 'react';

const Main = ({ children }) => {
    return (
        <main class='h-full pb-16 overflow-y-auto'>
            {/* <!-- Remove everything INSIDE this div to a really blank page --> */}
            <div class='container px-6 mx-auto grid'>{children}</div>
        </main>
    );
};

export default Main;
