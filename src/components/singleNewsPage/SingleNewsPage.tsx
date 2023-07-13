import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NewsItem from "../newsItem/NewsItem";
import { getNewsId, getNews } from "../../hook/http.hook";
import Comments from "../comments/Comments";
import styled from "styled-components";
// interface NewsIDProp {
//   id: string;
// }
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
interface NewsItemData {
  title: string;
  by: string;
  time: number;
  url: string;
  descendants: number;
  kids: number[];
}

function SingleNewsPage() {
  const { id } = useParams<string>();
  const [commentsId, setCommentsId] = useState<number[]>([]);
  const [newsItem, setNewsItem] = useState<NewsItemData>({
    title: "",
    by: "",
    time: 0,
    url: "",
    descendants: 0,
    kids: [],
  });
  // const News = NewsItem as unknown as React.JSXElementConstructor<{
  //   num: number;
  //   id: number;
  // }>;
  const [newsId, setNewsId] = useState([]);

  useEffect(() => {
    if (id) getNews(id).then(({ data }) => setNewsItem(data));
    setInterval(() => {
      if (id) getNews(id).then(({ data }) => setNewsItem(data));
    }, 60000);
  }, []);

  const { title, by, time, url, descendants, kids } = newsItem;
  const getTime = (initialTime: number): string => {
    const currentTime: Date = new Date();
    const passedTime: number = currentTime.getTime() - initialTime * 1000;

    if (passedTime < 60000) {
      const second: number = Math.floor(passedTime / 1000);
      return second > 1 ? `${second} seconds` : `${second} second`;
    } else if (passedTime < 3600000) {
      const minute: number = Math.floor(passedTime / 60000);
      return minute > 1 ? `${minute} minutes` : `${minute} minute`;
    } else if (passedTime < 86400000) {
      const hour: number = Math.floor(passedTime / 3600000);
      return hour > 1 ? `${hour} hours` : `${hour} hour`;
    } else if (passedTime < 2592000000) {
      const day: number = Math.floor(passedTime / 86400000);
      return day > 1 ? `${day} days` : `${day} day`;
    } else if (passedTime < 31536000000) {
      const month: number = Math.floor(passedTime / 2592000000);
      return month > 1 ? `${month} months` : `${month} month`;
    } else {
      const getYear: number = new Date(initialTime * 1000).getFullYear();
      const getMonth: string = new Date(initialTime * 1000).toLocaleString(
        "en-us",
        {
          month: "short",
        }
      );
      const getDay: number = new Date(initialTime * 1000).getDate();
      return `on ${getMonth} ${getDay}, ${getYear}`;
    }
  };

  const resultTime = useMemo(() => {
    return getTime(time);
  }, [time]);

  return (
    <Container sx={{ pt: 15, backgroundColor: "#fff" }}>
      <Box display="flex" justifyContent="space-between">
        <Link to="/">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#A65C00",
              transform: "translateY(-80%)",
              "&:hover": {
                backgroundColor: "#BF8030",
              },
            }}
            startIcon={<ArrowBackIcon />}
          >
            To main
          </Button>
        </Link>

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
            if (id) getNews(id).then(({ data }) => setNewsItem(data));
          }}
        >
          Update Comments
        </Button>
      </Box>

      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        {title}
        <Typography variant="subtitle2" component="div">
          <Link to={url}>{url}</Link>
        </Typography>
        <Typography variant="subtitle2" component="div">
          Author: {by}. Created: {resultTime} ago.
        </Typography>
        <Typography variant="subtitle2" component="div">
          Comments: {descendants}.
        </Typography>
      </Typography>
      {kids
        ? kids.map((id) => {
            return <Comments key={id} id={id} getTime={getTime} />;
          })
        : null}
    </Container>
  );
}
export default SingleNewsPage;
