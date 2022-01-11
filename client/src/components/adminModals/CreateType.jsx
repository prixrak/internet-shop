import React, { useState, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createType, deleteType, fetchTypes } from './../../http/filterAPI';
import { Context } from './../../index';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';
import { observer } from 'mobx-react-lite';

const CreateType = observer(({ show, onHide }) => {
  const [value, setValue] = useState('')
  const { filterStore } = useContext(Context);

  const addType = () => {
    createType({name: value}).then(data => {
      setValue('');
      fetchTypes().then(types => filterStore.setTypes(types));
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Додати тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Введіть назву типу"}
          />
        </Form>
        <Modal.Title id="modal-title-vcenter">
          Видалити тип
        </Modal.Title>
        <ButtonGroup className='d-flex flex-wrap '>
          {filterStore.types.map(type =>
            <Button
              className='d-block mr-2 mt-2 rounded'
              style={{ cursor: 'no-drop' }}
              onClick={() => {
                if (window.confirm('Ви впевненні, що хочете видалити цей тип?')) {
                  deleteType(type.id);
                  filterStore.setTypes(filterStore.types.filter(t => t.id !== type.id));
                } 
              }}
              key={type.id}
            >
              {type.name}
            </Button>
          )}
        </ButtonGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
        <Button variant="outline-success" onClick={addType}>Додати</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateType;