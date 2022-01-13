import React, { useEffect, useContext } from 'react';
import { fetchBasketDevices } from '../http/basketAPI'
import { Alert, Container, Spinner } from 'react-bootstrap';

import Pages from '../components/Pages';
import DeviceList from '../components/DeviceList';
import { Context } from './../index';
import { observer } from 'mobx-react-lite';
import { useFetching } from './../hooks/useFetching';

const Basket = observer(() => {
  const {basketStore, filterStore} = useContext(Context);

  const [fetchBasketDevicesHook, loading] =  useFetching(() => 
    fetchBasketDevices(filterStore.selectedType.id, filterStore.selectedBrand.id, basketStore.page, basketStore.limit)
    .then(data => {
      console.log(data.rows)
      basketStore.setTotalCount(data.count);
      basketStore.setDevices(data.rows);
    })
  );

  useEffect(() => {
    fetchBasketDevicesHook();
  }, [basketStore.page, filterStore.selectedType, filterStore.selectedBrand]);

  console.log(basketStore.devices.length)
  if(loading) return <Spinner animation={"grow"} />;
  return (
    <Container>
      {basketStore.devices.length
        ? <React.Fragment>
            <DeviceList devices={basketStore.devices}/>
            <Pages store={basketStore}/> 
          </React.Fragment>
        : <Alert className='info mt-2'>Ваша корзина пуста</Alert>
      }
    </Container>
  );
});

export default Basket;