import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        margin: '20px 10px',
      }
    },
    MuiListItemText: {
      secondary: {
        textAlign: 'right'
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      }
    },
    MuiListItem: {
      gutters: {
        padding: '10px'
      },
    },
    MuiCardHeader: {
      root: {
        padding: '16px 16px 0 16px'
      }
    },
    MuiSelect: {
      select: {
        minWidth: '180px'
      }
    },
    MuiTableCell: {
      root: {
        borderRight: '1px solid rgba(224, 224, 224, 1)'
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: '#ddd'
      }
    },
    MuiDialog: {
      paper: {
        minWidth: '300px',
        minHeight: '220px'
      }
    }
  }
})