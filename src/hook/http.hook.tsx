import axios from "axios";

export const _apiBase = "https://hacker-news.firebaseio.com/v0/";
export const _baseOffset = 100;

export const getStory = async (storyId: number | string) => {
  const result = await axios.get(`${_apiBase}item/${storyId}.json`);
  return result;
};
export const getStoryIds = async () => {
  const result = await axios
    .get(`${_apiBase}newstories.json`)
    .then(({ data }) => data);
  return result;
};
