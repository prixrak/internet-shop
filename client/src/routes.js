
import React , { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';

import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts';
import Shop from './pages/Shop';

// import Admin from './pages/Admin';
// import Basket from './pages/Basket';
// import Device from './pages/Device';
// import Auth from './pages/Auth';
const Device = React.lazy(() => import('./pages/Device'));
const Basket = React.lazy(() => import('./pages/Basket'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Auth = React.lazy(() => import('./pages/Auth'));


export const authAdminRoutes = [
  {path: ADMIN_ROUTE, component: <Suspense fallback={<Spinner animation={"grow"} />}><Admin /></Suspense>},
];

export const authRoutes = [
  {path: BASKET_ROUTE, component: <Suspense fallback={<Spinner animation={"grow"} />}><Basket /></Suspense>},
];

export const publicRoutes = [
  {path: LOGIN_ROUTE, component: <Suspense fallback={<Spinner animation={"grow"} />}><Auth /></Suspense>},
  {path: REGISTRATION_ROUTE, component: <Suspense fallback={<Spinner animation={"grow"} />}><Auth /></Suspense>},
  {path: SHOP_ROUTE, component: <Shop />},
  {path: DEVICE_ROUTE + '/:id', component: <Suspense fallback={<Spinner animation={"grow"} />}><Device /></Suspense>},
];
