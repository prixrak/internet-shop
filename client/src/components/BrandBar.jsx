import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
  const { filterStore } = useContext(Context);

  return (
    <Row className="d-flex ml-1">
      {filterStore.brands.map(brand =>
        <Card
          style={{ cursor: 'pointer' }}
          key={brand.id}
          className="p-3"
          onClick={() => filterStore.setSelectedBrand(brand)}
          border={brand.id === filterStore.selectedBrand.id ? 'danger' : 'light'}
        >
          {brand.name}
        </Card>
      )}
    </Row>
  );
});

export default BrandBar;