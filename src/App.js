import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';
import { store, persistor } from './store/';

import history from './services/history';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Router history={history}>
        <Routes />
        <ToastContainer autoClose={3000} />
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
