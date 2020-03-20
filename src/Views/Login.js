import React from 'react'
import { Container, TextField, Button } from '@material-ui/core'
import useStyles from '@Styles'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const classes = useStyles()
  const history = useHistory()
  const login = () => {
    history.push('/')
  }
  return (
    <Container maxWidth="sm">
      <div className={classes.login_main}>
        <TextField
          label="Login ID"
        />
        <TextField 
          label="Password"
        />
        <Button onClick={login} variant="contained" color="primary">
          Login
        </Button>
      </div>
    </Container>
  )
}

export default Login