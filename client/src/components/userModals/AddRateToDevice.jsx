import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, ButtonGroup } from 'react-bootstrap';
import { addRate } from '../../http/ratingApi';


const AddRateToDevice = ({show, onHide, deviceId}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ваша оцінка
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <ButtonGroup 
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
        onClick={(e) => {
          addRate({rate: e.target.id, deviceId}).then(rating => console.log(rating));
        }}
      >
        <Button id='1' variant="light"><i id='1' className="far fa-star"></i></Button>
        <Button id='2' variant="light"><i id='2' className="far fa-star"></i></Button>
        <Button id='3' variant="light"><i id='3' className="far fa-star"></i></Button>
        <Button id='4' variant="light"><i id='4' className="far fa-star"></i></Button>
        <Button id='5' variant="light"><i id='5' className="far fa-star"></i></Button>
      </ButtonGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
        <Button variant="outline-success" onClick={() => console.log("add")}>Додати</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRateToDevice;