import { Context } from "..";
import { fetchDevices } from "../http/deviceAPI";
import { useContext } from "react";


export const useFetchingDevices = () => {
  const {filterStore, deviceStore} = useContext(Context);

  return () => fetchDevices(filterStore.selectedType.id, filterStore.selectedBrand.id, deviceStore.page, deviceStore.limit, filterStore.searchQuery)
  .then(data => {
    deviceStore.setDevices(data.rows);
    deviceStore.setTotalCount(data.count);
  });
}