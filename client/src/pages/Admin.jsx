import React, { useState, useContext, useEffect } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/adminModals/CreateBrand";
import CreateDevice from "../components/adminModals/CreateDevice";
import CreateType from "../components/adminModals/CreateType";
import { fetchBrands, fetchTypes } from '../http/filterAPI';
import { Context } from './../index';

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  const { filterStore } = useContext(Context);

  useEffect(() => {
    fetchTypes().then(types => filterStore.setTypes(types))
    fetchBrands().then(brands => filterStore.setBrands(brands))
  }, []);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Додати або видалити Тип
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Додати або видалити Бренд
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Додати Пристрій
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  );
};

export default Admin;