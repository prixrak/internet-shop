import { $authHost, $host } from "./index";


export const createDevice = async (device) => {
  console.log("create")
  const { data } = await $authHost.post('api/device/', device);
  console.log(data)
  return data
}

export const fetchDevices = async (typeId, brandId, page, limit, name) => {
  const { data } = await $host.get('api/device/', {params: {
    typeId,
    brandId,
    page,
    limit,
    name
  }})
  return data
}

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get('api/device/' + id)
  return data
}

export const deleteDevice = async (id) => {
  const { data } = await $authHost.delete('api/device/', { data: {id} });
  return data;
}