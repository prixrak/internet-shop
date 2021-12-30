import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

export const Context = createContext(null); // context to use stores in app

ReactDOM.render(
  <Context.Provider value={{
    userStore: new UserStore(), // add user store in context
    device: new DeviceStore() // add device store in context
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

