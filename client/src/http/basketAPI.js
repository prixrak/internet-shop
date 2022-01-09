import { $authHost } from "./index";

export const fetchBasketDevices = async (typeId, brandId, page, limit, name) => {
  const { data } = await $authHost.get('api/basket/', {params: {
    typeId,
    brandId,
    page,
    limit,
    name
  }});
  return data;
}

export const addDeviceToBasket = async (device) => {
  const { data } = await $authHost.post('api/basket/', device);
  return data;
}

export const deleteFromBasket = async (device) => {
  const { data } = await $authHost.delete('api/basket/', { data: device });
  return data;
}