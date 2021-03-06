import React, { useEffect, useState, useRef } from 'react'
import { TableContainer, Table, Paper, TextField, CircularProgress, TableHead, TableBody, TableRow, TableCell, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Link } from '@material-ui/core'
import { getGiftRecordList, createGiftRecord, updateGiftRecord } from '@api'
import useStyles from '@Styles'
import Alert from '@components/alert'
const header = [
  'ID',
  'Link',
  'Create Date',
  'Release Date',
  'Edit'
]

const CreateGiftDialog = props => {
  // state
  const classes = useStyles()
  const [fileObj, setFileObj] = useState()
  const [fileObjUrl, setFileObjUrl] = useState()
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().slice(0, 10))
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [loading, setLoading] = useState(false)
  // function
  const fileUploader = useRef(null)
  const onFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file)
    if (file !== undefined) {
      if (file.size > 1000000) {
        setAlertText('圖片大小限制不得大於1MB')
        setAlertOpen(true)
      } else {
        setFileObj(file)
        setFileObjUrl(window.URL.createObjectURL(file))
      }
    }
  }
  const uploadPhoto = () => {
    // console.log('upload')
    fileUploader.current.click()
  }
  const onComfirm = () => {
    setLoading(true)
    createGiftRecord(fileObj, releaseDate).then(res => {
      console.log(res)
      if (res.status === 200) {
        props.onClose()
        setLoading(false)
      } else {
        console.log(res.statusText)
        setAlertText(res.data.error)
        setAlertOpen(true)
        setLoading(false)
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
        <DialogTitle>Create Gift
          {/* alert */}
          <Alert open={alertOpen} setOpen={onAlertOpenClick} text={alertText} /></DialogTitle>
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
          {fileObjUrl && <img src={fileObjUrl} style={{ display: 'flex', margin: '10px auto' }} alt="uploaded_img" />}

        </DialogContent>
        {/* action */}
        <DialogActions>
          <div style={{ position: 'relative' }}>
            <Button color="primary" onClick={props.onClose} disabled={loading}>cancel</Button>
          </div>
          <div style={{ position: 'relative' }}>
            <Button color="primary" onClick={onComfirm} disabled={loading || fileObj === undefined}>comfirm</Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
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
  const [loading, setLoading] = useState(false)
  // function
  const fileUploader2 = useRef(null)
  const onFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file)
    if (file !== undefined) {
      if (file.size > 1000000) {
        setAlertText('圖片大小限制不得大於1MB')
        setAlertOpen(true)
      } else {
        setFileObj(file)
        setFileObjUrl(window.URL.createObjectURL(file))
      }
    }
  }
  const uploadPhoto = () => {
    // console.log('upload')
    fileUploader2.current.click()
  }
  const onReleaseDateChange = (e) => {
    console.log(e.target.value)
    setReleaseDate(e.target.value)
  }
  const onComfirm = () => {
    setLoading(true)
    console.log(props.date)
    console.log()
    updateGiftRecord(props.id, fileObj, releaseDate).then(res => {
      console.log(res)

      if (res.status === 200) {
        props.onClose()
        setFileObjUrl(null)
        setLoading(false)
      } else {
        setAlertText(res.statusText)
        setAlertOpen(true)
        setLoading(false)
      }
    })
  }
  const onAlertOpenClick = () => {
    setAlertOpen(state => !state)
  }
  // make sure this.releaseDate = props.date
  useEffect(() => {
    console.log(props.date)
    setReleaseDate(props.date)
  }, [props.date])

  useEffect(() => {
    setFileObjUrl(null)
  }, [])

  return (
    <>
      <input
        type="file"
        id="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileUploader2}
        onChange={onFileChange}
      />
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Edit Gift
          {/* alert */}
          <Alert open={alertOpen} setOpen={onAlertOpenClick} text={alertText} /></DialogTitle>
        <DialogContent>
          <Button
            className={classes.uploadButton}
            onClick={uploadPhoto}
            variant="contained"
            color="primary"
          >
            UPLOAD
          </Button>

          <TextField type="date" value={releaseDate} onChange={onReleaseDateChange} label="release date:" className={classes.uploadRelaseDateInput} />
          {/* photo */}
          {fileObjUrl && <img src={fileObjUrl} style={{ display: 'flex', margin: '10px auto' }} alt="uploaded_img" />}

        </DialogContent>
        {/* action */}
        <DialogActions>
          <div style={{ position: 'relative' }}>
            <Button color="primary" onClick={props.onClose} disabled={loading}>cancel</Button>
          </div>
          <div style={{ position: 'relative' }}>
            <Button color="primary" onClick={onComfirm} disabled={loading || fileObj === undefined}>comfirm</Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default () => {
  // state
  const classes = useStyles()
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
                <TableCell align="left" key={`Broker_TableCell_${index}`}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {giftRecordList && giftRecordList.map((item, index) => (
              <TableRow key={`gift_record_list_${index}`}>
                <TableCell>{item.id}</TableCell>
                <TableCell align="left">
                  <Link href={item.giftImageLink} target="blank">{item.giftImageLink}</Link>
                </TableCell>
                <TableCell align="left">{item.createTimestamp}</TableCell>
                {/* <TableCell align="left">{item.releaseDate}</TableCell> */}
                {/* make releaseDate cant edit */}
                {/* <TableCell align="left">
                  <TextField
                    id="date"
                    type="date"
                    className={classes.releaseDateInput}
                    defaultValue={item.releaseDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell> */}
                <TableCell align="left">{item.releaseDate}</TableCell>
                <TableCell align="left">
                  <Button
                    style={{ marginLeft: '2rem' }}
                    variant="contained"
                    color="default"
                    onClick={e => onEditButtonClick(e, item.releaseDate, item.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}