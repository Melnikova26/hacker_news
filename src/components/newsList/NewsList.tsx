import { useEffect, useState } from "react";
import { List, Container, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import NewsItem from "../newsItem/NewsItem";
import { getNewsId, getNews } from "../../hook/http.hook";
const NewsElement = NewsItem as unknown as React.JSXElementConstructor<{
  id: number;
}>;

export default function NewsList() {
  const [newsId, setNewsId] = useState([]);

  useEffect(() => {
    getNewsId().then((data) => setNewsId(data.slice(0, 100)));
    setInterval(
      () => getNewsId().then((data) => setNewsId(data.slice(0, 100))),
      60000
    );
  }, []);

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
          getNewsId().then((data) => setNewsId(data.slice(0, 100)));
        }}
      >
        Update News
      </Button>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-label="news folder"
      >
        {newsId.map((id, i) => (
          <NewsElement key={id} id={id} />
        ))}
      </List>
    </Container>
  );
}
