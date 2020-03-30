import React from 'react'
import Appbar from './Appbar'
import Drawer from './Drawer'
import useStyles from '../Styles/classes'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { renderRoutes } from 'react-router-config'

const Main = ({route}) => {
  const drawerOpen = useSelector(state => state.drawerOpen)
  const classes = useStyles()
  return (
    <div className={classes.App}>
      <Appbar />
      <Drawer />
      <main className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}>
        <div className={classes.drawerHeader} />
        {renderRoutes(route.routes)}
      </main>
    </div>
  )
}

export default Main