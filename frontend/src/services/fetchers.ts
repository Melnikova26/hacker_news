import axios from "axios";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL
      : "/api",
});

export const getComments = async (newsId: number) => {
  const result = await client.get(`${newsId}`);
  return result.data.data.story;
};
export const getNewsItems = async () => {
  const result = await client.get("");
  return result.data.data;
};
