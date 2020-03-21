import React from 'react'
import { TableContainer, Paper, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

const header = [
  'ID',
  'Customer',
  'Broker',
  'Gift',
  'Redeemed'
]

export default () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            {header.map((item, index) => (
              <TableCell align="right" key={`Broker_TableCell_${index}`}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </TableContainer>
    </div>
  )
}