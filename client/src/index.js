import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BasketStore from './store/BasketStore';
import DeviceStore from './store/DeviceStore';
import FilterStore from './store/FilterStore';
import UserStore from './store/UserStore';

export const Context = createContext(null); // context to use stores in app

ReactDOM.render(
  <Context.Provider value={{
    userStore: new UserStore(), // add user store in context
    deviceStore: new DeviceStore(), // add deviceStore store in context
    filterStore: new FilterStore(), // store where are saved filter modes 
    basketStore: new BasketStore()
  }}>
    <App className='App'/>
  </Context.Provider>,
  document.getElementById('root')
);

