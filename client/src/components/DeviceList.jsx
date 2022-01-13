import React from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(({devices, setShowAlert}) => {

  return (
    <Row className="d-flex">
      {devices.map(device =>
        <DeviceItem key={device.id} device={device} setShowAlert={setShowAlert}/>
      )}
    </Row>
  );
});

export default DeviceList;