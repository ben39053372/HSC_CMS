import React, { useEffect, useState } from 'react'
import { Typography, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Table, Button, Link } from '@material-ui/core'
import { getClosingRecordList, updateClosingRecordList } from '@api'

const header = [
  'ID',
  'Customer',
  'Broker',
  'Gift',
  'Redeemed'
]

// id: 1
// customerEmail: "mgarfield79@gmail.com"
// brokerName: "Kim"
// imagePath: "http://203.186.46.106:36002/assets/1/image.jpg"
// isRedeemed: 1

export default () => {
  // state
  const [closingRecordList, setClosingRecordList] = useState([])
  
  // function
  const onRedeemClick = (id, value) => {
    let data = {
      isRedeemed: !value
    }
    updateClosingRecordList(id, data).then(res => {
      console.log(res)
      fetchData()
    })
  }
  const fetchData = () => {
    getClosingRecordList().then(res => {
      console.log(res.data)
      setClosingRecordList(res.data.closingList)
    })
  }

  // effect
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div>
      <Typography variant="h4">Closing Record</Typography>
      <div style={{marginTop: '20px'}} />
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
          {closingRecordList && closingRecordList.map(item => (
            <TableRow key={`closing_record_list_${item.id}`}>
              <TableCell>{item.id}</TableCell>
              <TableCell align="left">{item.customerEmail}</TableCell>
              <TableCell align="left">{item.brokerName}</TableCell>
              <TableCell align="left"><Link href={item.imagePath} target="blank" >{item.imagePath}</Link></TableCell>
              <TableCell align="left">
                <Button variant="contained" color="default" onClick={() => onRedeemClick(item.id, item.isRedeemed)}>
                  {item.isRedeemed ? 'yes' : 'no'}
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