import React, { useEffect } from 'react';
import { fetchBasket } from '../http/basketAPI'
const Basket = () => {
  useEffect(() => {
    fetchBasket().then(data => console.log(data))
  }, []);
  return (
    <div>
      BASKET
    </div>
  );
};

export default Basket;