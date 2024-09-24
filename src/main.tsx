import React from 'react';
import './css/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';

export const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
