import axios from "axios";

export const _apiBase = "https://hacker-news.firebaseio.com/v0/";
export const _baseOffset = 100;
const enum Methods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}
export const getNews = async (newsId: string | number) => {
  try {
    const result = await axios.get(`${_apiBase}item/${newsId}.json`);
    return result;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};
export const getNewsId = async () => {
  try {
    const result = await axios.get(`${_apiBase}newstories.json`);
    return result.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};
