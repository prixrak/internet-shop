
import React , { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';

import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts';
import Shop from './pages/Shop';

import Admin from './pages/Admin';
import Basket from './pages/Basket';
import Device from './pages/Device';
import Auth from './pages/Auth';
// const Device = React.lazy(() => import('./pages/Device'));
// const Basket = React.lazy(() => import('./pages/Basket'));
// const Admin = React.lazy(() => import('./pages/Basket'));
// const Auth = React.lazy(() => import('./pages/Auth'));


{/* <Suspense fallback={<Spinner animation={"grow"} />}></Suspense> */}
export const authAdminRoutes = [
  {path: ADMIN_ROUTE, component: <Admin />},
];

export const authRoutes = [
  {path: BASKET_ROUTE, component: <Basket />},
];

export const publicRoutes = [
  {path: LOGIN_ROUTE, component: <Auth />},
  {path: REGISTRATION_ROUTE, component: <Auth />},
  {path: SHOP_ROUTE, component: <Shop />},
  {path: DEVICE_ROUTE + '/:id', component: <Device />},
];
