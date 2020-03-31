import React, { useEffect, useState } from 'react'
import { Typography, TableContainer, Paper, TableHead, TableBody, Button, TableRow, TableCell, Table, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@material-ui/core'
import { getBrokerList, updateBroker, getCompanyList, addBroker } from '@api'

import Alert from '@components/alert'

import useStyles from '@Styles'

const header = [
  'ID',
  'Name',
  'Company',
  'Phone#',
  'Email',
  'Active',
  'Privilege',
  'Edit'
]

const useCompanyList = () => {
  const [companyList, setCompanyList] = useState([])
  useEffect(() => {
    getCompanyList().then(res => {
      setCompanyList(res.data.companyList)
    })
  }, [])
  return companyList
}

const emailRE = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

const CreateModal = props => {
  const companyList = useCompanyList()
  // state
  const [newBrokerData, setNewBrokerData] = useState({
    id: '',
    email: '',
    nameEn: '',
    nameCht: '',
    companyId: 1,
    phoneNumber: '',
    loginId: '',
    isActive: 1,
    privilege: 1,
  })
  const [errorOpen, setErrorOpen] = useState(false)
  const [errorStatus, setErrorStatus] = useState('')

  // function
  const onNewDataChange = (e, label) => {
    e.persist();
    setNewBrokerData(state => {
      let temp = { ...state }
      temp[label] = e.target.value
      return temp
    })
  }
  const onNewSubmit = () => {
    (emailRE.test(newBrokerData.email) && newBrokerData.loginId !== '') && addBroker(newBrokerData).then(res => {
      console.log(res)
      if (res.status !== 200) {
        setErrorStatus(res.data.error)
        setErrorOpen(true)
      } else {
        props.onClose()
      }
    })
  }
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create Broker</DialogTitle>
      <DialogContent>
        <TextField label="Email" error={!emailRE.test(newBrokerData.email)} value={newBrokerData.email} onChange={e => onNewDataChange(e, 'email')} />
        <TextField label="NameEn" value={newBrokerData.nameEn} onChange={e => onNewDataChange(e, 'nameEn')} />
        <TextField label="Login ID" error={newBrokerData.loginId === ''} value={newBrokerData.loginId} onChange={e => onNewDataChange(e, 'loginId')} />
        <TextField label="NameCht" value={newBrokerData.nameCht} onChange={e => onNewDataChange(e, 'nameCht')} />
        <TextField label="Phone" value={newBrokerData.phoneNumber} onChange={e => onNewDataChange(e, 'phoneNumber')} />

        <TextField label="Company" value={newBrokerData.companyId} onChange={e => onNewDataChange(e, 'companyId')} select>
          {companyList.map((item, index) => (
            <MenuItem key={`new_companyListItem_${index}`} value={item.id}>
              {item.nameEn + item.nameCht}
            </MenuItem>
          ))}
        </TextField>

        <TextField label="privilege" type="number" value={newBrokerData.privilege} onChange={e => onNewDataChange(e, 'privilege')} />
        <Alert open={errorOpen} setOpen={setErrorOpen} text={errorStatus} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onNewSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const EditModal = props => {
  // state
  const [brokerData, setBrokerData] = useState({})

  // function
  const onDataChange = (e, label) => {
    e.persist();
    setBrokerData(state => {
      let temp = { ...state }
      temp[label] = e.target.value
      return temp
    })
  }
  const onSubmit = () => {
    updateBroker(brokerData).then(res => {
      if (res.status === 200) {
        props.onClose()
      }
    })
  }

  // effect
  useEffect(() => {
    setBrokerData(props.data)
  }, [props])
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit Broker Info</DialogTitle>
      {brokerData !== undefined &&
        <DialogContent>
          <TextField label="NameEn" value={brokerData.nameEn} onChange={e => onDataChange(e, 'nameEn')} />
          <TextField label="NameCht" value={brokerData.nameCht} onChange={e => onDataChange(e, 'nameCht')} />
          <TextField label="Phone" value={brokerData.phoneNumber} onChange={e => onDataChange(e, 'phoneNumber')} />
          <TextField label="Email" error={!emailRE.test(brokerData.email)} value={brokerData.email} />
          <TextField label="Company" value={brokerData.companyNameCht + ' ' + brokerData.companyNameEn} />
          <TextField label="Login ID" value={brokerData.loginId} />
          <TextField label="privilege" type="number" value={brokerData.privilege} onChange={e => onDataChange(e, 'privilege')} />
        </DialogContent>
      }
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default () => {
  const classes = useStyles()

  // state
  const [brokerList, setBrokerList] = useState([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [currentBroker, setCurrentBroker] = useState()

  // function
  const fetchData = async () => {
    await getBrokerList().then(res => {
      console.log(res)
      if (res.data.info === 'success') {
        setBrokerList(res.data.brokerList)
      }
    })
  }
  const onPrivilegeChange = async (e, data) => {
    let obj = data
    obj.privilege = e.target.value
    await updateBroker(obj)
    await fetchData()
  }
  const onActiveClick = async (data) => {
    let obj = data
    obj.isActive = !data.isActive
    await updateBroker(obj)
    await fetchData()
  }
  // editModal
  const onEditButtonClick = data => {
    setCurrentBroker(data)
    setEditModalOpen(true)
  }
  const handleEditModalClose = () => {
    setEditModalOpen(false)
    fetchData()
  }

  // CreateModal
  const onCreateButtonClick = data => {
    setCreateModalOpen(true)
  }
  const handleCreateModalClose = () => {
    setCreateModalOpen(false)
    fetchData()
  }

  // effect
  // Fetch data
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Typography variant="h4">Brokers</Typography>
      <div style={{marginTop: '20px'}} />
      <CreateModal open={createModalOpen} onClose={handleCreateModalClose} />
      <EditModal open={editModalOpen} onClose={handleEditModalClose} data={currentBroker} />
      <Button variant="contained" color="primary" onClick={onCreateButtonClick}>Create</Button>
      <div style={{ margin: '20px' }} />
      <TableContainer component={Paper}>
        <Table>
          {/* Head */}
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <TableCell key={`Broker_TableCell_${index}`} align="left">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Body */}
          <TableBody>
            {brokerList && brokerList.map(item => (
              <TableRow key={`brokerList_${item.id}`}>
                <TableCell component="th" scope="row">#{item.id}</TableCell>
                <TableCell align="left">{item.nameEn + ' ' + item.nameCht}</TableCell>
                <TableCell align="left">{item.companyNameEn + ' ' + item.companyNameCht}</TableCell>
                <TableCell align="left">{item.phoneNumber}</TableCell>
                <TableCell align="left">{item.email}</TableCell>

                {/* active button */}
                <TableCell align="left">
                  <Button
                    variant="contained"
                    onClick={() => onActiveClick(item)}
                    color={item.isActive ? 'primary' : 'secondary'}
                  >
                    {item.isActive ? 'yes' : 'no'}
                  </Button>
                </TableCell>

                {/* privilege */}
                <TableCell align="left">
                  <TextField onChange={e => onPrivilegeChange(e, item)} className={classes.privilegeInput} type="number" value={item.privilege} />
                </TableCell>

                {/* Edit button */}
                <TableCell align="left">
                  <Button
                    onClick={() => onEditButtonClick(item)}
                    variant="contained"
                    color="secondary"
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