import { API } from "../../constants/api";
import httpHandler from "../../utils/http";

export const dashboardService = () => {
  const getAllLalin = async (date) => {
    try {
      const res = await httpHandler.get(`${API.lalin}?tanggal=${date}`);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  return { getAllLalin };
};
