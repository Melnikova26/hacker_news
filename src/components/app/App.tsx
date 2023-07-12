import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import NewsList from "../newsList/NewsList";
import { Box } from "@mui/material";
import { getStoryIds, getStory } from "../../hook/http.hook";

function App() {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
    getStory(36678519).then((data) => console.log(data.data));
    console.log(JSON.stringify(storyIds));
  }, []);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#BF7C30", minHeight: "100vh" }}>
      <Header />
      <NewsList />
    </Box>
  );
}

export default App;
