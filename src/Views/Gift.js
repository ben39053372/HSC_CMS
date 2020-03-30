import React, { useEffect, useState, useRef } from 'react'
import { TableContainer, Table, Paper, TextField, TableHead, TableBody, TableRow, TableCell, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Link } from '@material-ui/core'
import { getGiftRecordList, createGiftRecord, updateGiftRecord } from '@api'
import useStyles from '@Styles'
import Alert from '@components/alert'
const header = [
  'ID',
  'Link',
  'Create Date',
  'Release Date',
]

const CreateGiftDialog = props => {
  // state
  const classes = useStyles()
  const [fileObj, setFileObj] = useState()
  const [fileObjUrl, setFileObjUrl] = useState()
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().slice(0,10))
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')

  // function
  const fileUploader = useRef(null)
  const onFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file)
    setFileObj(file)

    setFileObjUrl(window.URL.createObjectURL(file))
  }
  const uploadPhoto = () => {
    // console.log('upload')
    fileUploader.current.click()
  }
  const onComfirm = () => {
    createGiftRecord(fileObj, releaseDate).then(res => {
      console.log(res)
      if(res.status === 200) {
        props.onClose()
      } else {
        setAlertText(res.statusText)
        setAlertOpen(true)
      }
    })
  }
  const onAlertOpenClick = () => {
    setAlertOpen(state => !state)
  }

  return (
    <>
      <input
        type="file"
        id="file"
        style={{ display: 'none' }}
        ref={fileUploader}
        onChange={onFileChange}
      />
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Create Gift</DialogTitle>
        <DialogContent>
          <Button
            className={classes.uploadButton}
            onClick={uploadPhoto}
            variant="contained"
            color="primary"
          >
            UPLOAD
          </Button>
          {/* date */}
          <TextField type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} label="release date:" className={classes.uploadRelaseDateInput} />
          {/* photo */}
          { fileObjUrl && <img src={fileObjUrl} style={{display: 'flex', margin: '10px auto'}} alt="uploaded_img" />}
          {/* alert */}
          <Alert open={alertOpen} setOpen={onAlertOpenClick} text={alertText} />
        </DialogContent>
        {/* action */}
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>cancel</Button>
          <Button color="primary" onClick={onComfirm}>comfirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const EditGiftDialog = props => {
  // state
  const classes = useStyles()
  const [fileObj, setFileObj] = useState()
  const [fileObjUrl, setFileObjUrl] = useState()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [releaseDate, setReleaseDate] = useState(props.date)
  // function
  const fileUploader2 = useRef(null)
  const onFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file)
    setFileObj(file)

    setFileObjUrl(window.URL.createObjectURL(file))
  }
  const uploadPhoto = () => {
    // console.log('upload')
    fileUploader2.current.click()
  }
  const onComfirm = () => {
    console.log(props.date)
    console.log()
    updateGiftRecord(props.id, fileObj, releaseDate).then(res => {
      console.log(res)
      if(res.status === 200) {
        props.onClose()
      } else {
        setAlertText(res.statusText)
        setAlertOpen(true)
      }
    })
  }
  const onAlertOpenClick = () => {
    setAlertOpen(state => !state)
  }
  // make sure this.releaseDate = props.date
  useEffect(() => {
    setReleaseDate(props.date)
  }, [props.date])

  return (
    <>
      <input
        type="file"
        id="file"
        style={{ display: 'none' }}
        ref={fileUploader2}
        onChange={onFileChange}
      />
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Edit Gift</DialogTitle>
        <DialogContent>
          <Button
            className={classes.uploadButton}
            onClick={uploadPhoto}
            variant="contained"
            color="primary"
          >
            UPLOAD
          </Button>
          <TextField type="date" value={props.date} onChange={e => setReleaseDate(e.target.value)} label="release date:" className={classes.uploadRelaseDateInput} />
          {/* photo */}
          { fileObjUrl && <img src={fileObjUrl} style={{display: 'flex', margin: '10px auto'}} alt="uploaded_img" />}
          {/* alert */}
          <Alert open={alertOpen} setOpen={onAlertOpenClick} text={alertText} />
        </DialogContent>
        {/* action */}
        <DialogActions>
          <Button color="primary" onClick={props.onClose}>cancel</Button>
          <Button color="primary" onClick={onComfirm}>comfirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default () => {
  // state
  const [giftRecordList, setGiftRecordList] = useState([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currGiftReleaseDate, setCurrGiftReleaseDate] = useState()
  const [currID, setCurrID] = useState()

  // function
  const fetchData = () => {
    getGiftRecordList().then(res => {
      setGiftRecordList(res.data.giftList)
    })
  }
  const onCreateDialogClose = () => {
    setCreateDialogOpen(false)
    fetchData()
  }
  const onEditDialogClose = () => {
    setEditDialogOpen(false)
    fetchData()
  }
  const onEditButtonClick = (e, date, id) => {
    setCurrGiftReleaseDate(date)
    setCurrID(id)
    setEditDialogOpen(true)
  }

  // effect
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <EditGiftDialog open={editDialogOpen} onClose={onEditDialogClose} date={currGiftReleaseDate} id={currID} />
      <CreateGiftDialog open={createDialogOpen} onClose={onCreateDialogClose} />
      <Typography variant="h4">Gift</Typography>
      <div style={{ marginTop: '20px' }} />

      <Button onClick={() => setCreateDialogOpen(true)} variant="contained" color="primary" > Create </Button>
      <div style={{ marginTop: '20px' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <TableCell align={index === 0 ? 'left' : 'right'} key={`Broker_TableCell_${index}`}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {giftRecordList && giftRecordList.map((item, index) => (
              <TableRow key={`gift_record_list_${index}`}>
                <TableCell>{item.id}</TableCell>
                <TableCell align="right">
                  <Link href={item.giftImageLink} target="blank">{item.giftImageLink}</Link>
                  <Button
                    style={{ marginLeft: '2rem' }}
                    variant="contained"
                    color="default"
                    onClick={e => onEditButtonClick(e, item.releaseDate, item.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">{item.createTimestamp}</TableCell>
                {/* <TableCell align="right">{item.releaseDate}</TableCell> */}
                <TableCell align="right">
                  <TextField
                    id="date"
                    type="date"
                    defaultValue={item.releaseDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}