import React, { useState, useEffect } from 'react'
import { Typography, Tab, Tabs, Divider, TextField, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { getTandC, UpdateTandC } from '@api'

const FinishDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose} >
      <DialogContent>
        <Typography variant="h5">{props.msg}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default () => {

  // state
  const [finishMsg, setFinishMsg] = useState('')
  const [finishOpen, setFinishOpen] = useState(false)
  const [lang, setLang] = useState(0)
  const [terms, setTerms] = useState({
    titleEn: 'titleEn',
    titleCht: 'titleCht',
    contentEn: 'contentEn',
    contentCht: 'contentCht',
  })

  // function
  const onFinishDialogClose = () => {
    setFinishOpen(false)
  }
  const handleChange = (e, value) => {
    setLang(value)
  }
  const onInputChange = (e, label) => {
    console.log(e.target.value)
    e.persist();
    setTerms(state => {
      let temp = { ...state }
      temp[label] = e.target.value
      console.log(temp)
      return temp
    })
  }
  const onUpdateClick = async () => {
    let result = await UpdateTandC(1, terms).then(res => {
      console.log(res.data)
      return res.data
    })
    console.log(result)
    await setFinishMsg(result.info)
    await setFinishOpen(true)
    fetchData()
  }
  const fetchData = () => {
    getTandC(1).then(res => {
      console.log(res.data.termsAndConditions)
      setTerms(res.data.termsAndConditions)
    })
  }

  // effect
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>

      <FinishDialog open={finishOpen} onClose={onFinishDialogClose} msg={finishMsg} />
      <Typography variant="h4">T&C</Typography>
      <div style={{ marginTop: '20px' }} />
      <Button variant="contained" color="primary" onClick={onUpdateClick} >Update</Button>
      <div style={{backgroundColor: '#fff', marginTop: '20px', padding: '20px'}}>
        <Tabs
          value={lang}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="中文" />
          <Tab label="英文" />
        </Tabs>
        <div style={{ marginTop: '20px' }} />
        <Divider />
        {lang === 0 && (
          <>
            <TextField style={{display: 'flex', flexGrow: 1}} label="T&C Title" value={terms.titleCht} onChange={(e) => onInputChange(e, 'titleCht')} />
            <TextField style={{display: 'flex', flexGrow: 1}} label="T&C Content" value={terms.contentCht} multiline onChange={(e) => onInputChange(e, 'contentCht')} />
          </>
        )}
        {lang === 1 && (
          <>
            <TextField style={{display: 'flex', flexGrow: 1}} label="T&C Title" value={terms.titleEn} onChange={(e) => onInputChange(e, 'titleEn')} />
            <TextField style={{display: 'flex', flexGrow: 1}} label="T&C Content" value={terms.contentEn} multiline onChange={(e) => onInputChange(e, 'contentEn')} />
          </>
        )}
      </div>

    </div>
  )
}