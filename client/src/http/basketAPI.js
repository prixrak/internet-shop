import { $authHost } from "./index";

export const fetchBasketDevices = async (typeId, brandId, page, limit) => {
  const { data } = await $authHost.get('api/basket/', {params: {
    typeId,
    brandId,
    page,
    limit
  }});
  return data;
}

export const addDeviceToBasket = async (device) => {
  const { data } = await $authHost.post('api/basket/', device);
  return data;
}