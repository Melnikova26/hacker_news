import axios from "axios";
import { Paths } from "../components/app/App";

export const getComments = async (newsId: number) => {
  try {
    const result = await axios.get(`http://localhost:8000/api/${newsId}`);
    return result.data.data.story;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};
export const getNewsItems = async () => {
  try {
    const result = await axios.get(`http://localhost:8000/api${Paths.MAIN}`);
    return result.data.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};
