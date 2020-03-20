const TOGGLE_DRAWER = 'TOGGLE_DRAWER'

const store = {
  drawerOpen: false
}

const reducer = (state = store, action) => {
  switch(action.type) {
    case TOGGLE_DRAWER :
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      }
    default: 
      return state
  }
}

export default reducer