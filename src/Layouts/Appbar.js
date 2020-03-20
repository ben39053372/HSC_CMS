import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux'
import clsx from 'clsx';
import useStyles from '@/Styles/classes'
import { useSelector } from 'react-redux'

export default props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const drawerOpen = useSelector(state => state.drawerOpen)

  const openDrawer = () => {
    dispatch({
      type: "TOGGLE_DRAWER"
    })
  }
  return (
    <AppBar position="fixed"
      className={clsx(classes.appBar, {
      [classes.appBarShift]: drawerOpen,
    })}>
      <Toolbar>
        <IconButton edge="start" onClick={openDrawer} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h5">CMS</Typography>
      </Toolbar>
    </AppBar>
  )
}
