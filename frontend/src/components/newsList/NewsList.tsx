import { useEffect, useState } from "react";
import { List, Container, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import NewsItem from "../newsItem/NewsItem";
import { useAppSelector, useAppDispatch } from "../../store/hooksTyped";
import { fetchNewsItems } from "../../store/reducer";
import Spinner from "../spinner/Spinner";

const NewsElement = NewsItem as unknown as React.JSXElementConstructor<{
  id: number | string;
}>;

export default function NewsList() {
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const loading = useAppSelector((state) => state.newsIds.newsLoadingStatus);
  const newsItems = useAppSelector((state) => state.newsIds.newsItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shouldUpdate) {
      dispatch(fetchNewsItems());
      setShouldUpdate(false);
    }

    const IntervalId = setInterval(() => {
      setShouldUpdate(true);
      setShouldUpdate(false);
    }, 60000);

    return () => clearInterval(IntervalId);
  }, [dispatch, shouldUpdate]);

  useEffect(() => {
    dispatch(fetchNewsItems());
  }, [dispatch]);

  if (loading === "loading") {
    return <Spinner />;
  } else if (loading === "error") {
    return <h5>Ошибка загрузки</h5>;
  }
  return (
    <Container sx={{ pt: 5, pb: 10 }}>
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
        onClick={() => setShouldUpdate(true)}
      >
        Update News
      </Button>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-label="news folder"
      >
        {newsItems.map((item) => (
          <NewsElement key={item.id} id={item.id} />
        ))}
      </List>
    </Container>
  );
}
