import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Alert, Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import { fetchOneDevice } from './../http/deviceAPI';
import { useParams } from 'react-router-dom';
import { Context } from './../index';
import { addDeviceToBasket, deleteFromBasket } from '../http/basketAPI';
import { fetchBasketDevices } from './../http/basketAPI';
import { observer } from 'mobx-react-lite';

const DevicePage = observer(() => {
  const [device, setDevice] = useState({info: []});
  const { id } = useParams();
  const {userStore, basketStore} = useContext(Context);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: ''
  });
  // fetch basket devices by specific user
  const fetchBasketDevicesCallback = useCallback(
    () => {
      fetchBasketDevices(null, null, null, -1).then(data => {
        basketStore.setTotalCount(data.count);
        basketStore.setDevices(data.rows);
      });
    },
    [],
  );

  useEffect(() => { 
    fetchOneDevice(id).then(device => setDevice(device));
    if(userStore.currentUser) fetchBasketDevicesCallback();
  }, []);


  return (
    <Container className="mt-3" style={{position: 'relative'}}>
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>Від: {device.price} грн.</h3>
            {basketStore.devices.some((d) => d?.id === device.id)
              ?
                <Button 
                  variant={"outline-dark"} 
                  onClick={async (e) => {
                    await deleteFromBasket({userId: userStore.currentUser.id, deviceId: device.id});
                    fetchBasketDevicesCallback();
                  }}>
                  Видалити з кошику
                </Button>
              :
                <Button 
                  variant={"outline-dark"} 
                  onClick={async (e) => {
                    if(userStore.currentUser) {
                      await addDeviceToBasket({userId: userStore.currentUser.id, deviceId: device.id});
                      fetchBasketDevicesCallback();
                    } else {
                      if(showAlert.show !== true) {
                        setShowAlert({show: true, message: 'Щоб додати річ у кошик - авторизуйтесь.'});
                        setTimeout(() => {
                          setShowAlert({show: false, message: ''});
                        }, 2000);
                      }
                    }
                  }}>
                  Додати у кошик
                </Button>
            }
            {showAlert.show &&
              <Alert variant="danger" className='mt-2 alertCustom tinyAlert'>{showAlert.message}</Alert>
            }
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) =>
            <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                {info.title}: {info.description}
            </Row>
        )}
      </Row>
    </Container>
  );
});

export default DevicePage;