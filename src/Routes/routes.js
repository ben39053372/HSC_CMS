import React from 'react'
import Login from '@View/Login'
import DashBoard from '@View/Dashboard'
import Brokers from '@View/Brokers'
import Gift from '@View/Gift'
import Setting from '@View/Setting'
import TandC from '@View/TandC'
import Layout from '@/Layouts'
import ClosingRecord from '@View/ClosingRecord'
import auth from '@utils/auth'
import { Redirect } from 'react-router-dom'

const routes = [
  {
    path: '/Login',
    component: Login,
    render: ()=> auth() ? <Redirect to="/" /> : <Login/>
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
        isPages: true,
        render: ()=> auth() ? <DashBoard /> : <Redirect to="/Login" />
      },
      {
        path: '/Brokers',
        component: Brokers,
        name: 'Brokers',
        isPages: true,
        render: ()=> auth() ? <Brokers /> : <Redirect to="/Login" />
      },
      {
        path: '/closingRecord',
        component: ClosingRecord,
        name: 'Closing Record',
        isPages: true,
        render: ()=> auth() ? <ClosingRecord /> : <Redirect to="/Login" />
      },
      {
        path: '/Gift',
        component: Gift,
        name: 'Gift',
        isPages: true,
        render: ()=> auth() ? <Gift /> : <Redirect to="/Login" />
      },
      {
        path: '/Setting',
        component: Setting,
        name: 'Setting',
        isPages: true,
        render: ()=> auth() ? <Setting /> : <Redirect to="/Login" />
      },
      {
        path: '/TandC',
        component: TandC,
        name: 'T&C',
        isPages: true,
        render: ()=> auth() ? <TandC /> : <Redirect to="/Login" />
      },
    ]
  },  
]

export default routes