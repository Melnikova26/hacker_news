import axios from "axios";
import { Story } from "./types";
import { concurencyBalancer, isResponseSuccess } from "./utils";

export const _apiBase: string = "https://hacker-news.firebaseio.com/v0/";
export const _apiSuffix: string = ".json?print=pretty";

export const _apiLimit: number = 100;
export const getNewsIds = async (useLimit = false): Promise<number[]> => {
  const url = `${_apiBase}newstories${_apiSuffix}`;
  const response = await axios.get(url);
  if (isResponseSuccess(response) && Array.isArray(response.data)) {
    if (useLimit) {
      const slicedIDs: number[] = response.data.slice(0, _apiLimit);
      return slicedIDs;
    } else {
      return response.data;
    }
  }
  return [];
};

export const getNewsByIds = async (storiesIDs: number[]): Promise<Story[]> => {
  const result = await concurencyBalancer<Story>(50, storiesIDs, getNewsById);
  return result;
};

export const getNewsById = async (newsId: number): Promise<Story | null> => {
  const url = `${_apiBase}item/${newsId}${_apiSuffix}`;
  const response = await axios.get(url);

  if (isResponseSuccess(response)) {
    return response.data;
  }

  return null;
};
