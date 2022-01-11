import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { createDevice } from './../../http/deviceAPI';
import '../../styles/dropFile.css';

const CreateDevice = observer(({ show, onHide }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  
  const { filterStore } = useContext(Context);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
  }

  const selectFile = e => {
    setFile(e?.target.files[0]);
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', filterStore.selectedBrand.id);
    formData.append('typeId', filterStore.selectedType.id);
    formData.append('info', JSON.stringify(info));
    createDevice(formData).then(data => onHide());
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Додати пристрій
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{filterStore.selectedType.name || "Виберіть тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {filterStore.types.map(type =>
                <Dropdown.Item
                  onClick={() => filterStore.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{filterStore.selectedBrand.name || "Виберіть бренд"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {filterStore.brands.map(brand =>
                <Dropdown.Item
                  onClick={() => filterStore.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-3"
            placeholder="Введіть назву пристрою"
          />
          <Form.Control
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введіть вартісь пристрою"
            type="number"
          />
          <Form.Label 
            type="file"
            htmlFor="files"
            className='dropArea'
          >
            {file === null
              ? <div className='fileText'>Drag and Drop or Choose File</div>
              : <div className=''>Вибраний файл: {file?.name}</div>
            }
            <Form.Control
              id="files"
              className="mt-3 inputFile"
              type="file"
              onChange={selectFile}
              accept="image/*"
              onDrop={e => {
                  e.preventDefault();
                  e.target.files = e.dataTransfer.files;
                  selectFile(e);
                }
              }
            />
          </Form.Label>
          <hr />
          <Button
            variant={"outline-dark"}
            onClick={addInfo}
          >
            Додати характеристику
          </Button>
          {info.map(i =>
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Назва"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Опис"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  Видалити
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
        <Button variant="outline-success" onClick={addDevice}>Додати</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;