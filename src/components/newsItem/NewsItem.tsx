import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Typography, ListItem, Divider } from "@mui/material";
import { getNews } from "../../hook/http.hook";
import styled from "@mui/styled-engine-sc";
import getTime from "../../utils/timeModify";
import { useAppDispatch, useAppSelector } from "../../store/hooksTyped";
import { fetchNewsItem } from "../../store/reducer";
const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
interface NewsIDProp {
  id: string;
}

interface NewsItemData {
  title: string;
  score: number;
  by: string;
  time: number;
  url: string;
}
const NewsItem = ({ id }: NewsIDProp) => {
  const newsItem = useAppSelector((state) => state.newsIds.storyItem);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNewsItem(id));
  }, []);

  const { title, score, by, time, url } = newsItem ?? {};

  const resultTime = getTime(time!);
  // useMemo(() => {
  //   return getTime(time);
  // }, [newsItem]);

  return url ? (
    <>
      <ListItem>
        <Typography variant="h6" component="div" sx={{ fontWeight: "700" }}>
          <StyledLink to={`/${id}`}>{title}</StyledLink>
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
