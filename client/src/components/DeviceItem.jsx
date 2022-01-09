import React, {useState, useContext} from 'react';
import { Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png';
import {DEVICE_ROUTE} from "../utils/consts";
import { useNavigate } from 'react-router-dom';
import AddRateToDevice from './userModals/AddRateToDevice';
import { fetchDeviceRateByUser } from '../http/ratingApi';
import { Context } from './../index';


const DeviceItem = ({device}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [rate, setRate] = useState(0);
  const {userStore} = useContext(Context);
  
  
  return (
    <div>
      <Col md={3} className={"mt-3"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
        <Card className='shadow-sm p-3 bg-white rounded' style={{ width: 180, cursor: 'pointer' }} border={"light"}>
          <Image width={150} height={150} src={process.env.REACT_APP_API_URL +  device.img} />
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>Samsung...</div>
            <button 
              className="d-flex align-items-center btn btn-light"
              onClick={async (e) => {
                  e.stopPropagation();
                  if(userStore.currentUser) {
                    setVisible(true);
                    // fetch device rate
                    await fetchDeviceRateByUser(device.id).then(deviceRating => deviceRating ? setRate(deviceRating.rate) : setRate(0));
                  } else {
                    alert("Перед тим, як оцінювати товар - потрібно авторизуватись.")
                  }
                }
              }          
            >
              <div className='mr-1'>{device.rating}</div>
              <Image width={18} height={18} src={star} />
            </button>
          </div>
          <div>{device.name}</div>
        </Card>
      </Col>
      {userStore.currentUser &&
        <AddRateToDevice rate={rate} setRate={setRate} show={visible} onHide={() => setVisible(false)} deviceId={device.id}/> 
      }
      
    </div>
  );
};

export default DeviceItem;