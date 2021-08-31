import SidebarContent from './SidebarContent'

const DesktopSidebar = (props) => {
    return (
        <aside className='z-20 hidden w-64 overflow-y-auto bg-indigo-50 dark:bg-gray-800 lg:block flex-shrink-0'>
            <SidebarContent />
        </aside>
    );
};

export default DesktopSidebar;
