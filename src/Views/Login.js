import React,{ useState } from 'react'
import { Container, TextField, Button, Typography } from '@material-ui/core'
import useStyles from '@Styles'
import { useHistory } from 'react-router-dom'
import { login } from '@api'
import md5 from 'md5'

const Login = () => {
  const classes = useStyles()
  const history = useHistory()
  
  // state
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // function
  const onLoginClick = () => {
    if(loginId !== ''){
      login(loginId, md5(password)).then(res => {
        console.log(res)
        if(res.status === 200) {
          localStorage.setItem('CmsJWT',res.data.cmsToken)
          history.push('/')
        }else {
          setErrorMsg(res.data.error)
        }
      })
    } else {
      setErrorMsg('Please Input Login ID')
    }
  }
  const onLoginIdChange = e => {
    setErrorMsg('')
    setLoginId(e.target.value)
  }
  const onPasswordChange = e => {
    setPassword(e.target.value)
  }
  return (
    <Container maxWidth="sm">
      <div style={{marginTop: '20px'}} />
      <Typography variant="h2" align="center">HeSheCar CMS</Typography>
      <div className={classes.login_main}>
        <TextField
          label="Login ID"
          value={loginId}
          onChange={onLoginIdChange}
        />
        <TextField 
          label="Password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        <Typography variant="subtitle1" align="center" style={{color: 'red'}}>{errorMsg}</Typography>
        <Button onClick={onLoginClick} variant="contained" color="primary">
          Login
        </Button>
      </div>
    </Container>
  )
}

export default Login