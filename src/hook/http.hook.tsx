import axios from "axios";
import { Paths } from "../components/app/App";

export const getComments = async (newsId: number) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/${newsId}`
    );
    return result.data.data.story;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};
export const getNewsItems = async () => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}${Paths.MAIN}`
    );
    return result.data.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};
