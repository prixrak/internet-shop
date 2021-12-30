import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../index';
import { ADMIN_ROLE, SHOP_ROUTE } from '../utils/consts';
import { authRoutes, publicRoutes, authAdminRoutes } from './../routes';
import {observer} from 'mobx-react-lite';


const AppRouter = observer(() => {
  const {userStore} = useContext(Context);
  return (
    <Routes>
      { 
        publicRoutes.map((route) => 
        <Route key={route.path} path={route.path} element={<route.component />} />)
      }
      { 
        userStore.currentUser &&
        authRoutes.map((route) => 
        <Route key={route.path} path={route.path} element={<route.component />} />)
      }
      { 
        userStore?.currentUser?.role === ADMIN_ROLE &&
        authAdminRoutes.map((route) => 
        <Route key={route.path} path={route.path} element={<route.component />} />)
      }
      
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />}/>  

    </Routes>
  );
});

export default AppRouter;