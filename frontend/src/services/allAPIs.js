import commonAPI from "./commonAPI";
import { serverURL } from "./serverURL";

export const addMachineAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/api/machines`, reqBody, "");
};

export const getMachinesAPI = async () => {
  return await commonAPI("GET", `${serverURL}/api/machines`, "", "");
};

export const acknowledgeFaultAPI = async (id) => {
  return await commonAPI("PATCH", `${serverURL}/api/machines/${id}/status`, {"status":"idle"}, "");
};

export const deleteMachineAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/api/machines/${id}`, "", "");
};
