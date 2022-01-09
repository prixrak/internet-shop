import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, ButtonGroup } from 'react-bootstrap';
import { addRate } from './../../http/ratingApi';
import { fetchDevices } from '../../http/deviceAPI';
import { Context } from './../../index';
import { fetchBasketDevices } from './../../http/basketAPI';



const AddRateToDevice = ({show, onHide, deviceId, rate, setRate}) => { 
  const {deviceStore, basketStore, filterStore} = useContext(Context);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Відгук
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <ButtonGroup
        className="ratingBlock"
        onMouseOver={
          (e) => {
            e.currentTarget.childNodes.forEach(children => {
                if(children.id <= e.target.id) children.classList.add('text-warning');
                else children.classList.remove('text-warning');
              }
            );
          }
        }
        onMouseLeave={e => e.currentTarget.childNodes.forEach(children => children.classList.remove('text-warning'))}
        onClick={async (e) => {
          if(e.target.id != rate) {
            await addRate({rate: e.target.id, deviceId}).then(rating => setRate(rating.rate));
            // fetch devices when update rate to update rate on view
            fetchDevices(filterStore.selectedType.id, filterStore.selectedBrand.id, deviceStore.page, deviceStore.limit)
            .then(data => {
              deviceStore.setDevices(data.rows);
              deviceStore.setTotalCount(data.count);
            });
            fetchBasketDevices(filterStore.selectedType.id, filterStore.selectedBrand.id, basketStore.page, basketStore.limit)
            .then(data => {
              basketStore.setTotalCount(data.count);
              basketStore.setDevices(data.rows);
            })
          }
        }}
      >
        <Button id='1' variant="light"><i id='1' className="far fa-star"></i></Button>
        <Button id='2' variant="light"><i id='2' className="far fa-star"></i></Button>
        <Button id='3' variant="light"><i id='3' className="far fa-star"></i></Button>
        <Button id='4' variant="light"><i id='4' className="far fa-star"></i></Button>
        <Button id='5' variant="light"><i id='5' className="far fa-star"></i></Button>
      </ButtonGroup>
      {rate !== 0 && <p className="font-weight-light mt-3 ml-1">Ваша оцінка: {rate}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={onHide}>Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRateToDevice;