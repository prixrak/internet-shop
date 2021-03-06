import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type)
  return data
}

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type')
  return data
}

export const deleteType = async (id) => {
  const { data } = await $authHost.delete('api/type/', { data: {id} });
  return data;
}

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand')
  return data
}

export const deleteBrand = async (id) => {
  const { data } = await $authHost.delete('api/brand/', { data: {id} });
  return data;
}