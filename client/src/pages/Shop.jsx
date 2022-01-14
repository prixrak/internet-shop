import React, {useContext, useEffect, useState} from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from './../components/TypeBar';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchTypes } from '../http/filterAPI';

import Pages from '../components/Pages';
import { useFetchingDevices } from '../hooks/useFetchingDevices';

const Shop = observer(() => {
  const {deviceStore, filterStore} = useContext(Context);
  const [loading, setLoading] = useState(true);

  const fetchDevicesHook = useFetchingDevices();

  useEffect(() => {
    setLoading(true);
    fetchTypes().then(types => filterStore.setTypes(types));
    fetchBrands().then(brands => filterStore.setBrands(brands));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchDevicesHook().then(() => setLoading(false));
  }, [deviceStore.page]);

  useEffect(() => {
    setLoading(true);
    fetchDevicesHook().then(() => setLoading(false));
    if(deviceStore.devices.length) deviceStore.setPage(1);
  }, [filterStore.selectedType, filterStore.selectedBrand, filterStore.searchQuery]);

  return (
    <Container style={{position: 'relative'}}>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar/>
          {deviceStore.devices.length !== 0 &&
            <DeviceList devices={deviceStore.devices}/>
          }
          {!deviceStore.devices.length && loading !== true &&
            <Alert className='info mt-2'>Таких товарів ще немає у наявності</Alert>
          }
          <Pages store={deviceStore} loading={loading}/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;