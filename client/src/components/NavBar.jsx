import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { BASKET_ROUTE } from './../utils/consts';

const NavBar = observer(() => {
  const {userStore} = useContext(Context);
  const navigate = useNavigate();
  
  const logOut = () => {
    navigate(LOGIN_ROUTE);
    userStore.setCurrentUser(null);
    localStorage.removeItem('token');
  }

  console.log(userStore.currentUser);
  return (
    <Navbar  bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: 'white', textDecoration:'none' }} to={SHOP_ROUTE}><i class="fab fa-shopify mr-1"></i>КупиУнас</NavLink>
        {userStore.currentUser &&
          <Nav className='ml-auto' style={{ color: 'white' }}>
            {userStore.currentUser.role === 'ADMIN' &&
              <Button className="ml-2" variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>
                Адмін панель
              </Button>
            }
            <Button className="ml-2" variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)}>
              <i class="fas fa-shopping-basket mr-1"></i>
              Корзина
            </Button>
            <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>
              <i class="fas fa-sign-out-alt mr-1"></i>
              Вийти
            </Button>
          </Nav>
        }
        {userStore.currentUser === null &&
          <Nav className='ml-auto' style={{ color: 'white' }}>
            <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}> 
              Ввійти
            </Button>
          </Nav>
        }          
      </Container>
    </Navbar>
  );
});

export default NavBar;