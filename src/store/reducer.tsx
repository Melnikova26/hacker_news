import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getNewsId, getNews } from "../hook/http.hook";

interface Story {
  title: string;
  by: string;
  time: number;
  url: string;
  descendants: number;
  kids?: number[];
  score?: number;
  text?: string;
}

interface INewsState {
  newsIds: string[];
  newsLoadingStatus: "idle" | "loading" | "error";
  story?: Story[];
  storyItem?: Story;
}

const initialState: INewsState = {
  newsIds: [],
  newsLoadingStatus: "idle",
  story: [],
  storyItem: {
    title: "",
    by: "",
    time: 0,
    url: "",
    descendants: 0,
    kids: [],
    score: 0,
    text: "",
  },
};

export const fetchNewsIds = createAsyncThunk<string[], undefined>(
  "newsIds/fetchNewsIds",
  async () => {
    return await getNewsId();
  }
);

export const fetchNewsItem = createAsyncThunk<Story, string | number>(
  "newsIds/fetchNewsItem",

  async (id) => {
    const newsResponse = await getNews(id);
    return newsResponse.data as Story;
  }
);

export const fetchCommentItem = createAsyncThunk<Story[], string | number>(
  "newsIds/fetchCommentItem",

  async (id) => {
    const commentResponse = await getNews(id);
    return commentResponse.data as Story[];
  }
);

export const newsIdsSlice = createSlice({
  name: "newsIds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsIds.pending, (state) => {
        state.newsLoadingStatus = "loading";
      })
      .addCase(fetchNewsIds.fulfilled, (state, action) => {
        state.newsLoadingStatus = "idle";
        state.newsIds = action.payload;
      })
      .addCase(fetchNewsIds.rejected, (state) => {
        state.newsLoadingStatus = "error";
      })
      .addCase(fetchNewsItem.pending, (state) => {
        state.newsLoadingStatus = "loading";
      })
      .addCase(fetchNewsItem.fulfilled, (state, action) => {
        state.newsLoadingStatus = "idle";
        state.storyItem = action.payload;
      })
      .addCase(fetchNewsItem.rejected, (state) => {
        state.newsLoadingStatus = "error";
      })
      .addCase(fetchCommentItem.fulfilled, (state, action) => {
        state.newsLoadingStatus = "idle";
        state.story = action.payload;
      })
      .addCase(fetchCommentItem.rejected, (state) => {
        state.newsLoadingStatus = "error";
      });
  },
});

export const { actions, reducer } = newsIdsSlice;
export default reducer;
