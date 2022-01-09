import { $authHost } from "./index";


export const addRate = async (rateToDevice) => {
  const { data } = await $authHost.post('api/rating/', rateToDevice);
  return data;
}

export const fetchDeviceRateByUser = async (id) => {
  const { data } = await $authHost.get('api/rating/' + id);
  return data;
}