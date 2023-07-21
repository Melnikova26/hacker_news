import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getNewsItems, getComments } from "../hook/http.hook";

interface Story {
  id: number;
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
  newsItems: Story[];
  newsLoadingStatus: "idle" | "loading" | "error";
  comments?: Story[];
}

const initialState: INewsState = {
  newsItems: [],
  newsLoadingStatus: "idle",
  comments: [],
};

export const fetchNewsItems = createAsyncThunk<Story[], undefined>(
  "newsIds/fetchNewsIds",
  async () => {
    return (await getNewsItems()) as unknown as Story[];
  }
);

export const fetchCommentItem = createAsyncThunk<Story, number>(
  "newsIds/fetchCommentItem",

  async (id) => {
    const commentResponse = await getComments(id);
    return commentResponse as Story;
  }
);

export const newsIdsSlice = createSlice({
  name: "newsIds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsItems.pending, (state) => {
        state.newsLoadingStatus = "loading";
      })
      .addCase(fetchNewsItems.fulfilled, (state, action) => {
        state.newsLoadingStatus = "idle";
        state.newsItems = action.payload;
      })
      .addCase(fetchNewsItems.rejected, (state) => {
        state.newsLoadingStatus = "error";
      })
      .addCase(fetchCommentItem.fulfilled, (state, action) => {
        state.newsLoadingStatus = "idle";
        state.comments?.push(action.payload);
      })
      .addCase(fetchCommentItem.rejected, (state) => {
        state.newsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

export const { actions, reducer } = newsIdsSlice;
export default reducer;
