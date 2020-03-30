import React, { useState, useEffect } from 'react'
import { getDashboardData, getDashboardDataByPeriod } from '@api'
import { Typography, Card, CardContent, CardHeader, TextField, List, ListItem, ListItemText, Grid } from '@material-ui/core';
import useStyles from '@Styles'

const Home = () => {
  const classes = useStyles()
  
  // state
  const [data, setData] = useState()
  const [periodData, setPeriodData] = useState()
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10))
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10))
  
  // function
  const onFormDateChange = (e) => {
    setFormDate(e.target.value)
  }
  const onToDateChange = (e) => {
    setToDate(e.target.value)
  }

  // effect
  useEffect(() => {
    getDashboardData().then(res => {
      let title = Object.keys(res.data.dashboard)
      let value = Object.values(res.data.dashboard)
      let list = []
      title.forEach((item, index) => {
        list.push({ title: title[index], value: value[index] })
      });
      setData(list)
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getDashboardDataByPeriod(formDate, toDate).then(res => {
      let title = Object.keys(res.data.dashboard)
      let value = Object.values(res.data.dashboard)
      let list = []
      title.forEach((item, index) => {
        list.push({ title: title[index], value: value[index] })
      });
      setPeriodData(list)
    })
  }, [formDate, toDate])
  return (
    <>
      <Typography variant="h4">Dashboard</Typography>
      <div style={{marginTop: '20px'}} />
      <Grid container>
        <Grid container justify="center" item xs={6}>
          <Card className={classes.dashboardList}>
            <CardHeader title="OverAll">
            </CardHeader>
            <CardContent>
              <List>
                {data && data.map((item, index) => (
                  <ListItem key={item.title}>
                    <ListItemText
                      className={classes.DashboardListItem}
                      secondaryTypographyProps={{
                        display: 'inline',
                        style: {
                          float: 'right'
                        }
                      }}
                      primary={item.title}
                      secondary={item.value}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

        </Grid>
        <Grid container justify="center" item xs={6}>
          <Card className={classes.dashboardList}>
            <CardHeader title="Now Record">
            </CardHeader>
            <CardContent>
              <TextField
                id="date"
                label="FORM"
                type="date"
                value={formDate}
                onChange={onFormDateChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="date"
                label="TO"
                type="date"
                value={toDate}
                onChange={onToDateChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <List>
                {periodData && periodData.map((item, index) => (
                  <ListItem key={item.title}>
                    <ListItemText
                      className={classes.DashboardListItem}
                      secondaryTypographyProps={{
                        display: 'inline',
                        style: {
                          float: 'right'
                        }
                      }} primary={item.title} secondary={item.value} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

        </Grid>
      </Grid>


    </>
  )
}

export default Home