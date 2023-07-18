import { useEffect, useState } from "react";
import { List, Container, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import NewsItem from "../newsItem/NewsItem";
import { getNewsId, getNews } from "../../hook/http.hook";
import { useAppSelector, useAppDispatch } from "../../store/hooksTyped";
import { fetchNewsIds } from "../../store/reducer";
import Spinner from "../spinner/Spinner";
// const NewsElement = NewsItem as unknown as React.JSXElementConstructor<{
//   id: number | string;
// }>;
interface NewsIdsState {
  newsIds: number[] | string[];
  newsLoadingStatus: "idle" | "loading" | "error";
}
export default function NewsList() {
  const loading = useAppSelector((state) => state.newsIds.newsLoadingStatus);
  const newsIds = useAppSelector((state) => state.newsIds.newsIds);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNewsIds());
    const intervalID = setInterval(() => dispatch(fetchNewsIds()), 60000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  if (loading === "loading") {
    return <Spinner />;
  } else if (loading === "error") {
    return <h5>Ошибка загрузки</h5>;
  }
  return (
    <Container sx={{ pt: 15 }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#A65C00",
          position: "fixed",
          right: "100px",
          top: "0",
          transform: "translateY(40%)",
          zIndex: "5",
          "&:hover": {
            backgroundColor: "#BF8030",
          },
        }}
        startIcon={<AutorenewIcon />}
        onClick={() => {
          dispatch(fetchNewsIds());
        }}
      >
        Update News
      </Button>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-label="news folder"
      >
        {newsIds.map((id) => (
          <NewsItem key={id} id={id} />
        ))}
      </List>
    </Container>
  );
}
