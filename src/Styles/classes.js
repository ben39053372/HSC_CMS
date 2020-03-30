import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 270

const useStyles = makeStyles(theme => ({
  App: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerButton: {
    fontSize: '1.6rem',
    padding: theme.spacing(1, 1, 1, 4)
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  login_main: {
    display: 'flex',
    flexDirection: 'column'
  },
  dashboardList: {
    width: '90%'
  },
  DashboardListItem: {
    borderBottom: '1px solid #DDD'
  },
  brokerListTable: {
    width: '100%'
  },
  privilegeInput: {
    padding: '8px',
    margin: '0px',
    width: '70px'
  },
  settingInput: {
    margin: '0 20px',
    width: '50px'
  },
  uploadButton: {
    display: 'flex',
    width: '10rem',
    margin: '0 auto 20px auto'
  },
  uploadRelaseDateInput: {
    display: 'flex',
    margin: '10px auto',
  }
}))

export default useStyles