import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const CreateItem = lazy(() => import('../pages/CreateItem'))
const UpdateItem = lazy(() => import('../pages/UpdateItem'))
const History = lazy(() => import('../pages/History'))

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
        path: '/updateitem',
        component: UpdateItem
    },
    {
        path: '/history',
        component: History
    }
]


export default routes
