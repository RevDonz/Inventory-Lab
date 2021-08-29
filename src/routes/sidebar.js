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
        icon: 'MenuIcon',
        name: 'Daftar Kategori',
        type: 'User'
    },
    {
        path: '/app/createcategory',
        icon: 'ModalsIcon',
        name: 'Tambah Kategori',
        type: 'User'
    },
    {
        path: '/app/user/dashboard',
        icon: 'ModalsIcon',
        name: 'Dashboard user',
        type: 'User'
    },
    {
        path: '/app/user/myProfile',
        icon: 'ModalsIcon',
        name: 'Profile',
        type: 'User'
    },
    {
        path: '/app/user/riwayatPeminjaman',
        icon: 'ModalsIcon',
        name: 'Riwayat Peminjaman',
        type: 'User'
    },
    {
        path: '/app/user/dashboard',
        icon: 'HomeIcon',
        name: 'List Barang',
    },
    {
        path: '/app/user/myProfile',
        icon: 'PeopleIcon',
        name: 'Akun Saya',
    },
    {
        path: '/app/user/riwayatPeminjaman',
        icon: 'CartIcon',
        name: 'Riwayat Peminjaman',
    }
];

export default routes