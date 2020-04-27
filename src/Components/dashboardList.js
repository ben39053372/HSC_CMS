import React from 'react'
import { Grid, List, ListItem, ListItemText } from "@material-ui/core"
import useStyles from '@Styles'

const secondaryProps = {
  display: "inline",
  style: { float: 'right' }
}

export default props => {
  const classes = useStyles()
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <List className={classes.dashboardList}>
          {props.data && props.data.slice(0, 2).map((item, index) => (
            <ListItem className={classes.DashboardListItem} key={`dashboard1_${index}`} >
              <ListItemText secondaryTypographyProps={secondaryProps} primary={item.title} secondary={item.content} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={4}>
        <List className={classes.dashboardList}>
          {props.data && props.data.slice(2, 5).map((item, index) => (
            <ListItem className={classes.DashboardListItem} key={`dashboard2_${index}`}>
              <ListItemText secondaryTypographyProps={secondaryProps} primary={item.title} secondary={item.content} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={4}>
        <List className={classes.dashboardList}>
          {props.data && props.data.slice(5, 8).map((item, index) => (
            <ListItem className={classes.DashboardListItem} key={`dashboard3_${index}`}>
              <ListItemText secondaryTypographyProps={secondaryProps} primary={item.title} secondary={item.content} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}