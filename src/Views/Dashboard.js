import React, { useState, useEffect } from 'react'
import { getDashboardData, getDashboardDataByPeriod } from '@api'
import { Typography, TextField } from '@material-ui/core';
import DashboardList from '@components/dashboardList'

const Home = () => {

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

  useEffect(() => {
    getDashboardData().then(res => {
      console.log(res)
      setData(res.data.dashboard)
    })
  }, [])

  useEffect(() => {
    getDashboardDataByPeriod(formDate, toDate).then(res => {
      setPeriodData(res.data.dashboard)
    })
  }, [formDate, toDate])

  return (
    <>
      <Typography variant="h4">Dashboard</Typography>
      <div style={{ marginTop: '20px' }} />

      <Typography variant="h5"> Over All </Typography>
      <div style={{ marginTop: '20px' }} />
      <DashboardList data={data} />
      <div style={{ marginTop: '20px' }} />

      <div style={{ marginTop: '20px' }} />
      <Typography variant="h5"> New Record </Typography>
      <TextField label="Date From :" type="date" value={formDate} onChange={onFormDateChange} />
      <TextField label="Date To :" type="date" value={toDate} onChange={onToDateChange} />
      
      <DashboardList data={periodData} />

    </>
  )
}

export default Home