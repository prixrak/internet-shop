import React, {useContext, useRef} from 'react';
import {Context} from "../../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROLE, ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE} from "../../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import './navbar.css';

const NavBar = observer(() => {
  const {userStore, filterStore} = useContext(Context);
  const navigate = useNavigate();
  const search = useRef(null);

  const logOut = () => {
    navigate(LOGIN_ROUTE);
    userStore.setCurrentUser(null);
    localStorage.removeItem('token');
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: 'white', textDecoration:'none' }} to={SHOP_ROUTE}><i className="fab fa-shopify mr-1"></i>КупиУнас</NavLink>
        <div className="search">
          <div className="search__wrapper">
            <i className="fas fa-search search__icon" 
              onMouseOver={() => search?.current?.classList.toggle('animated')}
            >
            </i>
            <input 
              value={filterStore.searchQuery} 
              onChange={(e) => filterStore.setSearchQuery(e.target.value)} 
              type="text" name="" placeholder="Шукаю..." className="search__input" ref={search} 
            />
          </div>
        </div>
        
        {userStore.currentUser &&
          <Nav className='ml-auto' style={{ color: 'white' }}>
            {userStore.currentUser.role === ADMIN_ROLE &&
              <Button className="ml-2" variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>
                Адмін панель
              </Button>
            }
            <Button className="ml-2" variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)}>
              <i className="fas fa-shopping-basket mr-1"></i>
              Корзина
            </Button>
            <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>
              <i className="fas fa-sign-out-alt mr-1"></i>
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