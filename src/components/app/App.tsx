import Header from "../header/Header";
import NewsList from "../newsList/NewsList";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleNewsPage from "../singleNewsPage/SingleNewsPage";
export enum Paths {
  MAIN = "/",
  NEWS_PAGE = "/:id",
}
function App() {
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
          <Route path={Paths.MAIN} element={<NewsList />} />
          <Route path={Paths.NEWS_PAGE} element={<SingleNewsPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
