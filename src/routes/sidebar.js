const routes = [
    {
        path: '/app/dashboard',
        icon: 'HomeIcon',
        name: 'Dashboard',
        type: 'Admin'
    },
    {
        path: '/app/items',
        icon: 'CollectionIcon',
        name: 'Data Barang',
        type: 'Admin'
    },
    {
        path: '/app/createitem',
        icon: 'DocumentAdd',
        name: 'Tambah Barang',
        type: 'Admin'
    },
    {
        path: '/app/category',
        icon: 'ClipboardList',
        name: 'Daftar Kategori',
        type: 'Admin'
    },
    {
        path: '/app/createcategory',
        icon: 'DocumentAdd',
        name: 'Tambah Kategori',
        type: 'Admin'
    },
    {
        path: '/app/user/dashboard',
        icon: 'HomeIcon',
        name: 'Dashboard',
        type: 'User'
    },
    {
        path: '/app/user/riwayatPeminjaman',
        icon: 'Refresh',
        name: 'Riwayat Peminjaman',
        type: 'User'
    },
    {
        path: '/app/user/myProfile',
        icon: 'UserIcon',
        name: 'Profile',
        type: 'User'
    },
    // {
    //     path: '/app/user/pengaturan',
    //     icon: 'SettingIcon',
    //     name: 'Pengaturan',
    //     type: 'User'
    // },
];

export default routes