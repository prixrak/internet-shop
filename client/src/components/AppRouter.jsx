import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../index';
import { SHOP_ROUTE } from '../utils/consts';
import { authRoutes, publicRoutes } from './../routes';
import {observer} from 'mobx-react-lite';


const AppRouter = observer(() => {
  const {user} = useContext(Context);
  return (
    <Routes>
      { 
        publicRoutes.map((route) => 
        <Route key={route.path} path={route.path} element={<route.component />} />)
      }
      { 
        user.isAuth === true &&
        authRoutes.map((route) => 
        <Route key={route.path} path={route.path} element={<route.component />} />)
      }
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />}/>  

    </Routes>
  );
});

export default AppRouter;