import React, {useContext, useEffect, useState} from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from './../components/TypeBar';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';
import { useFetching } from './../hooks/useFetching';

const Shop = observer(() => {
  const {deviceStore, filterStore} = useContext(Context);

  useEffect(() => {
    fetchTypes().then(types => filterStore.setTypes(types));
    fetchBrands().then(brands => filterStore.setBrands(brands));
  }, []);

  const [fetchDevicesHook, loading] =  useFetching(() => 
    fetchDevices(filterStore.selectedType.id, filterStore.selectedBrand.id, deviceStore.page, deviceStore.limit).
    then(data => {
      deviceStore.setDevices(data.rows);
      deviceStore.setTotalCount(data.count);
  }));

  useEffect(() => {
    fetchDevicesHook();
  }, [deviceStore.page, filterStore.selectedType, filterStore.selectedBrand]);

  if(loading) return <Spinner animation={"grow"} />;
  
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar/>
          {deviceStore.devices.length
            ? <DeviceList devices={deviceStore.devices}/>
            : <Alert className='info mt-2'>Таких товарів ще немає у наявності</Alert>
          }
          <Pages store={deviceStore}/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;