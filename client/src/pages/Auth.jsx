import React, { useContext, useMemo, useState } from 'react';
import { Alert, Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { registration, login } from './../http/userAPI';
import { useNavigate } from 'react-router-dom';
import '../styles/alert.css';

const Auth = observer(() => {
  const { userStore } = useContext(Context);
  const location = useLocation();
  const isLoginRoute = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: ''
  });
  
  const isEmailValid = useMemo(() => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email?.match(validRegex) ? true : false;
  }, [email]);

  const auth = async () => {
    try {
      let user;
      if(isEmailValid) {
        if (isLoginRoute) user = await login(email, password);
        else user = await registration(email, password);
        userStore.setCurrentUser(user);
        navigate(SHOP_ROUTE);
      } else {
        setShowAlert({
          show: true,
          message: 'Емейл введений неправильно'
        });
        setTimeout(() => {
          setShowAlert({show: false, message: ''});
        }, 2000);
      }
    } catch (e) {
      setShowAlert({show: true, message: e.response.data.message});
      setTimeout(() => {
        setShowAlert({show: false, message: ''});
      }, 2000);
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 80 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLoginRoute ? 'Авторизація' : "Реєстрація"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введіть ваш мейл..."
            type="email"
            value={email}
            onChange={async e => {
                await setEmail(e.target.value);
              }
            }
          />
          <Form.Control
            className="mt-3"
            placeholder="Введіть ваш пароль..."
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLoginRoute ?
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
              {isLoginRoute ? 'Ввійти' : 'Реєстрація'}
            </Button>
          </Row>
        </Form>
        {showAlert.show &&
          <Alert variant="danger" className='mt-2 alertCustom'>{showAlert.message}</Alert>
        }
      </Card>
    </Container>
  );
});

export default Auth;