import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const CreateItem = lazy(() => import('../pages/CreateItem'))
const UpdateItem = lazy(() => import('../pages/UpdateItem'))
const ListItems = lazy(() => import('../pages/ListItems'))
// const History = lazy(() => import('../pages/History'))
const History = lazy(() => import('../pages/History'))
const Category = lazy(() => import('../pages/Category'))
const CreateCategory = lazy(() => import('../pages/CreateCategory'))
const UpdateCategory = lazy(() => import('../pages/UpdateCategory'))

const routes = [
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/createitem',
        component: CreateItem
    },
    {
        path: '/updateitem/:id',
        component: UpdateItem
    },
    {
        path: '/items',
        component: ListItems
    },
    {
        path: '/history',
        component: History
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/createcategory',
        component: CreateCategory
    },
    {
        path: '/updatecategory/:id',
        component: UpdateCategory
    },
]


export default routes
