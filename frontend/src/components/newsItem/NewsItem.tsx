import { Link } from "react-router-dom";
import { Typography, ListItem, Divider } from "@mui/material";

import styled from "@mui/styled-engine-sc";
import getTime from "../../utils/timeModify";
import { useAppSelector } from "../../store/hooksTyped";

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
interface NewsIDProp {
  id: number;
}

const NewsItem: React.FC<NewsIDProp> = ({ id }) => {
  const newsItem = useAppSelector((state) =>
    state.newsIds.newsItems?.find((item) => item.id == id)
  );

  const { title, score, by, time, url } = newsItem ?? {};

  const resultTime = getTime(time!);

  if (!url) {
    return null;
  }
  return (
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
  );
};
export default NewsItem;
