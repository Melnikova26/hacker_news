import { useEffect, useState } from "react";
import { List, Container } from "@mui/material";
import NewsItem from "../newsItem/NewsItem";
import { getStoryIds } from "../../hook/http.hook";
export default function NewsList() {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
  }, []);

  return (
    <Container sx={{ pt: 15 }}>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-label="news folder"
      >
        {storyIds.map((id) => (
          <NewsItem key={id} id={id} />
        ))}
      </List>
    </Container>
  );
}
