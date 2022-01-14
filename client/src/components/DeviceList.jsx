import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Alert, Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(({devices}) => {
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: ''
  });

  return (
    <Row className="d-flex">
      {showAlert.show && 
        <Alert variant="danger" className='mt-2 alertTop'>{showAlert.message}</Alert>
      }
      {devices.map(device =>
        <DeviceItem key={device.id} device={device} setShowAlert={setShowAlert}/>
      )}
    </Row>
  );
});

export default DeviceList;