import { $authHost } from "./index";

export const fetchBasket = async () => {
  const { data } = await $authHost.get('api/basket');
  return data;
}