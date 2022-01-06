import React, { useEffect, useState, useContext } from 'react';
import { fetchBasketDevices } from '../http/basketAPI'
import { Alert, Col, Container, Row } from 'react-bootstrap';
import TypeBar from './../components/TypeBar';
import BrandBar from '../components/BrandBar';
import Pages from '../components/Pages';
import DeviceList from '../components/DeviceList';
import { Context } from './../index';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
  const {basketStore, filterStore} = useContext(Context);

  useEffect(() => {
    fetchBasketDevices(filterStore.selectedType.id, filterStore.selectedBrand.id, basketStore.page, basketStore.limit).then(data => {
      basketStore.setTotalCount(data.count);
      basketStore.setDevices(data.rows);
    });
  }, [basketStore.page, filterStore.selectedType, filterStore.selectedBrand]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          {basketStore.devices.length
            ? <DeviceList devices={basketStore.devices}/>
            : <Alert className='info mt-2'>Ваша корзина пуста</Alert>
          }
          <Pages store={basketStore}/>
        </Col>
      </Row>
    </Container>
  );
});

export default Basket;