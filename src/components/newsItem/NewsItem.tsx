import { useEffect, useState, useMemo } from "react";
import { Typography, ListItem, Divider } from "@mui/material";
import { getStory } from "../../hook/http.hook";
interface NewsIDProp {
  id: number;
}

interface NewsItemData {
  title: string;
  score: number;
  by: string;
  time: number;
  url: string;
}
const NewsItem = ({ id }: NewsIDProp) => {
  const [newsItem, setNewsItem] = useState<NewsItemData>({
    title: "",
    score: 0,
    by: "",
    time: 0,
    url: "",
  });
  useEffect(() => {
    getStory(id).then(({ data }) => data && data.url && setNewsItem(data));
  }, []);

  const { title, score, by, time, url } = newsItem;

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

  return url ? (
    <>
      <ListItem>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {title}
          <Typography variant="subtitle2" component="div">
            {`${score} point by ${by} ${resultTime} ago`}
          </Typography>
        </Typography>
      </ListItem>
      <Divider />
    </>
  ) : null;
};
export default NewsItem;
