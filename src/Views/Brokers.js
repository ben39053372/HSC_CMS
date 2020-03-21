import React from 'react'
import { TableContainer, Paper, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

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

export default () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            {header.map((item, index) => (
              <TableCell key={`Broker_TableCell_${index}`}>
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