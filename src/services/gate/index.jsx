import { API } from "../../constants/api";
import httpHandler from "../../utils/http";

export const gateService = () => {
  const getAllGate = async () => {
    try {
      const res = await httpHandler.get(API.gerbang);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const addGate = async (request) => {
    try {
      const res = await httpHandler.post(API.gerbang, request);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const updateGate = async (request) => {
    try {
      const res = await httpHandler.put(API.gerbang, request);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGate = async (request) => {
    try {
      const res = await httpHandler.delete(API.gerbang, request);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  return { getAllGate, addGate, updateGate, deleteGate };
};
