import React, { useState, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createBrand, deleteBrand, fetchBrands } from './../../http/filterAPI';
import { Context } from './../../index';
import  ButtonGroup  from 'react-bootstrap/ButtonGroup';
import { observer } from 'mobx-react-lite';

const CreateBrand = observer(({ show, onHide }) => {
  const [value, setValue] = useState('');
  const { filterStore } = useContext(Context);

  const addBrand = () => {
    createBrand({ name: value }).then(data => {
      setValue('');
      fetchBrands().then(brands => filterStore.setBrands(brands));
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
          Додати бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Введіть назву бренду"}
          />
        </Form>
        <Modal.Title id="modal-title-vcenter">
          Видалити бренд
        </Modal.Title>
        <ButtonGroup className='d-flex flex-wrap '>
          {filterStore.brands.map(brand =>
            <Button
              className='d-block mr-2 mt-2 rounded'
              style={{ cursor: 'no-drop' }}
              onClick={() => {
                if (window.confirm('Ви впевненні, що хочете видалити цей бренд?')) {
                  deleteBrand(brand.id);
                  filterStore.setBrands(filterStore.brands.filter(b => b.id !== brand.id));
                } 
              }}
              key={brand.id}
            >
              {brand.name}
            </Button>
          )}
        </ButtonGroup>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
        <Button variant="outline-success" onClick={addBrand}>Додати</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateBrand;