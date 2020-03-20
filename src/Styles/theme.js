import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        margin: '20px 10px'
      }
    }
  }
})