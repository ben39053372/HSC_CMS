import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@/Styles/theme'
import reducer from '@/Stores/reducer'
import Router from '@/Routes/'

const store = createStore(reducer)

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
