import React, {useState, } from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png';
import {DEVICE_ROUTE} from "../utils/consts";
import { useNavigate } from 'react-router-dom';
import AddRateToDevice from './userModals/AddRateToDevice';


const DeviceItem = ({device}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Col md={3} className={"mt-3"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
        <Card className='shadow-sm p-3 bg-white rounded' style={{ width: 180, cursor: 'pointer' }} border={"light"}>
          <Image width={150} height={150} src={process.env.REACT_APP_API_URL +  device.img} />
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>Samsung...</div>
            <button 
              className="d-flex align-items-center btn btn-light"
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
              }}          
            >
              <div className='mr-1'>{device.rating}</div>
              <Image width={18} height={18} src={star} />
            </button>
          </div>
          <div>{device.name}</div>
        </Card>
      </Col>
      <AddRateToDevice show={visible} onHide={() => setVisible(false)} deviceId={device.id}/>
    </div>
  );
};

export default DeviceItem;