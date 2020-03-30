import Login from '@View/Login'
import DashBoard from '@View/Dashboard'
import Brokers from '@View/Brokers'
import Gift from '@View/Gift'
import Setting from '@View/Setting'
import TandC from '@View/TandC'
import Layout from '@/Layouts'
import ClosingRecord from '@View/ClosingRecord'

const routes = [
  {
    path: '/Login',
    component: Login
  },
  {
    component: Layout,
    path: '/',
    routes: [
      {
        path: '/',
        component: DashBoard,
        name: 'DashBoard',
        exact: true,
        isPages: true
      },
      {
        path: '/Brokers',
        component: Brokers,
        name: 'Brokers',
        isPages: true
      },
      {
        path: '/closingRecord',
        component: ClosingRecord,
        name: 'Closing Record',
        isPages: true
      },
      {
        path: '/Gift',
        component: Gift,
        name: 'Gift',
        isPages: true
      },
      {
        path: '/Setting',
        component: Setting,
        name: 'Setting',
        isPages: true
      },
      {
        path: '/TandC',
        component: TandC,
        name: 'T&C',
        isPages: true
      },
    ]
  },  
]

export default routes