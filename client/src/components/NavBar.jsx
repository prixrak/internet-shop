import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";

const NavBar = observer(() => {
  const {user} = useContext(Context);
  const navigate = useNavigate();
  
  const logOut = () => {
    navigate(LOGIN_ROUTE);
    user.setUser({});
    user.setIsAuth(false);
  }

  return (
    <Navbar  bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: 'white', textDecoration:'none' }} to={SHOP_ROUTE}>КупиУнас</NavLink>
        {user.isAuth 
          ?
          <Nav className='ml-auto' style={{ color: 'white' }}>
            <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>
              Адмін панель
            </Button>
            <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>
              Вийти
            </Button>
          </Nav>
          :
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