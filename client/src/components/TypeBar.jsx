import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
    const {filterStore} = useContext(Context);
    
    return (
      <ListGroup>
        {filterStore.types.map(type =>
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            active={type.id === filterStore.selectedType.id}
            onClick={() => filterStore.setSelectedType(type)}
            key={type.id}
          >
            {type.name}
          </ListGroup.Item>
      )}
      </ListGroup>
    );
});

export default TypeBar;