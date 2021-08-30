import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const CreateItem = lazy(() => import('../pages/CreateItem'))
const UpdateItem = lazy(() => import('../pages/UpdateItem'))
const ListItems = lazy(() => import('../pages/ListItems'))
const Category = lazy(() => import('../pages/Category'))
const CreateCategory = lazy(() => import('../pages/CreateCategory'))
const UpdateCategory = lazy(() => import('../pages/UpdateCategory'))
const DashboardUser = lazy(() => import('../pages/DashboardUser'))
const Pengajuan = lazy(() => import('../pages/Pengajuan'))
const Profile = lazy(() => import('../pages/Profile'))
const RiwayatPeminjaman = lazy(() => import('../pages/RiwayatPeminjaman'))

const routes = [
    {
        path: '/dashboard',
        component: Dashboard,
        type: 'Admin'
    },
    {
        path: '/createitem',
        component: CreateItem,
        type: 'Admin'
    },
    {
        path: '/updateitem/:id',
        component: UpdateItem,
        type: 'Admin'
    },
    {
        path: '/items',
        component: ListItems,
        type: 'Admin'
    },
    {
        path: '/category',
        component: Category,
        type: 'Admin'
    },
    {
        path: '/createcategory',
        component: CreateCategory,
        type: 'Admin'
    },
    {
        path: '/updatecategory/:id',
        component: UpdateCategory,
        type: 'Admin'
    },
    {
        path: '/user/dashboard',
        component: DashboardUser,
        type: 'User'
    },
    {
        path: '/user/pengajuan/:id',
        component: Pengajuan,
        type: 'User'
    },
    {
        path: '/user/myProfile',
        component: Profile,
        type: 'User'
    },
    {
        path: '/user/riwayatPeminjaman',
        component: RiwayatPeminjaman,
        type: 'User'
    },
]


export default routes
