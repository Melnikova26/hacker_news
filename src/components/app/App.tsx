import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import NewsList from "../newsList/NewsList";
import { Box } from "@mui/material";
import { getNewsId, getNews } from "../../hook/http.hook";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleNewsPage from "../singleNewsPage/SingleNewsPage";

function App() {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    // getNewsId().then((data) => console.log(data));
    // getNews(36685852).then((data) => console.log(data.data));
    getNews(36691867).then((data) => console.log(data.data));
    getNews(36706142).then(({ data }) => console.log(data));
    console.log(JSON.stringify(storyIds));
  }, []);
  return (
    <Router>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#BF7C30",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/:id" element={<SingleNewsPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
