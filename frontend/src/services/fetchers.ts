import axios from "axios";

const client = axios.create({ baseURL: process.env.REACT_APP_API_URL + "/" });

export const getComments = async (newsId: number) => {
  try {
    const result = await axios.get(`${client}${newsId}`);
    return result.data.data.story;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

export const getNewsItems = async () => {
  try {
    const result = await axios.get(`${client}`);
    return result.data.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};
