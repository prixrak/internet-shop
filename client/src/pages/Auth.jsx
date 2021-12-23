import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { registration, login } from './../http/userAPI';
import { useNavigate } from 'react-router-dom';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const auth = async () => {
    try {
      let userAuth;
      if (isLogin) userAuth = await login(email, password);
      else userAuth = await registration(email, password);
      user.setUser(userAuth);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 80 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизація' : "Реєстрація"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введіть ваш мейл..."
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введіть ваш пароль..."
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ?
              <div>
                Немає аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зареєструйся!</NavLink>
              </div>
              :
              <div>
                Маєте аккаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
              </div>
            }
            <Button
              variant={"outline-success"}
              onClick={auth}
            >
              {isLogin ? 'Ввійти' : 'Реєстрація'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;