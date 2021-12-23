import React, { useContext } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
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
          />
          <Form.Control
            className="mt-3"
            placeholder="Введіть ваш пароль..."
            type="password"
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