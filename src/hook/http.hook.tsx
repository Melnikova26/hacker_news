import axios from "axios";

export const _apiBase = "https://hacker-news.firebaseio.com/v0/";
export const _baseOffset = 100;

export const getNews = async (newsId: number | string) => {
  const result = await axios.get(`${_apiBase}item/${newsId}.json`);
  return result;
};
export const getNewsId = async () => {
  const result = await axios
    .get(`${_apiBase}newstories.json`)
    .then(({ data }) => data);
  return result;
};
