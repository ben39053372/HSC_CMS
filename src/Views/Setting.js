import React, { useState, useEffect } from 'react'
import { Typography, TextField } from '@material-ui/core';
import useStyles from '@Styles'
import { getSetting, createSeting } from '@api'

export default () => {
  // state
  const classes = useStyles()
  const [recReq, setRecReq] = useState(1)

  // function
  const onresReqChange = e => {
    setRecReq(e.target.value)
    createSeting({
      "receiveRequestBrokerCount": e.target.value
    }).then(res => {
      console.log(res.data)
    })
  }
  const fetchData = () => {
    getSetting().then(res => {
      console.log(res)
      setRecReq(res.data.setting.receiveRequestBrokerCount)
    })
  }

  // effect
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Typography variant="h4">
        Setting
      </Typography>
      <Typography variant="h6">
        Number of broker receiving in each request:
        <TextField value={recReq} onChange={onresReqChange} type="number" inputProps={{
          min: 1,
        }} className={classes.settingInput} />
      </Typography>
    </div>
  )
}