import React, {useEffect} from 'react'
import { Drawer, List, Divider, ListItem } from '@material-ui/core'
import useStyles from '@/Styles/classes'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useSelector, useDispatch } from 'react-redux'
import routes from '@Routes/routes'
import { useHistory } from 'react-router-dom'

export default (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const drawerOpen = useSelector(state => state.drawerOpen)
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log(props)
  })
  const toggleDrawer = () => {
    dispatch({
      type: 'TOGGLE_DRAWER'
    })
  }
  const onDrawerButtonClick = (path) => {
    history.push(path)
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        
        {routes[1].routes.map((item, index) => {
          return item.isPages && (
            <ListItem 
              className={classes.drawerButton} 
              button
              onClick={() => onDrawerButtonClick(item.path)}
              key={'Drawer_ListItem_Key' + index}
            >
              {item.name}
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}