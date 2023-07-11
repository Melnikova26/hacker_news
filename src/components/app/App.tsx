import React from "react";
import Header from "../header/Header";
import NewsList from "../newsList/NewsList";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#BF7C30", minHeight: "100vh" }}>
      <Header />
      <NewsList />
    </Box>
  );
}

export default App;
