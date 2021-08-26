import SidebarContent from './SidebarContent'

const DesktopSidebar = (props) => {
    return (
        <aside class='z-20 hidden w-64 overflow-y-auto bg-indigo-50 dark:bg-gray-800 md:block flex-shrink-0'>
            <SidebarContent />
        </aside>
    );
};

export default DesktopSidebar;
